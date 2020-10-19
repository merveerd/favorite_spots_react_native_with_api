import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Platform,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from 'react-native-maps';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
//import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {colors, fonts} from '../../style';
import {addPersonalPlace} from '../../actions';
import {Button} from '../../components';
import {TextInput} from 'react-native-gesture-handler';

class AddLocation extends Component {
  static navigationOptions = {
    title: 'San Francisco',
  };

  state = {
    image: null,
    desc: null,
    markers: [],
    isMapReady: false,
    shownFavorites: false,
    selectedLocation: '',
    imageSelectTapped: false,

    region: {
      latitude: 10,
      longitude: 10,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    },
    regionChangeProgress: false,
  };

  componentDidMount() {
    this.requestLocationPermission();
  }

  onMapReady = () => {
    this.setState({isMapReady: true});
  };

  selectImage() {
    const options = {
      title: 'Profil Fotoğrafı Seçiniz',
      quality: 0.2,
      takePhotoButtonTitle: 'Resim Çek',
      chooseFromLibraryButtonTitle: 'Galeriden Seç',
      cancelButtonTitle: 'Kapat',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.uri;
        this.setState({image: uri});
      }
    });
  }

  showWelcomeMessage = () =>
    Alert.alert('Welcome to San Francisco', 'The food is amazing', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
      },
    ]);

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iPhone: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android: ' + response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };

        this.setState({initialPosition});
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  onCarouselItemChange = (index) => {
    let location = this.state.coordinates[index];

    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    this.state.markers[index].showCallout();
  };
  // Fetch location details as a JOSN from google map API
  fetchAddress = () => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        this.state.region.latitude +
        ',' +
        this.state.region.longitude +
        '&key=' +
        'AIzaSyDETQ1fCUl8u3oXaIhQEL0roq7HDeRaddQ',
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson', responseJson);
        const selectedAdress = responseJson.results[0].formatted_address;

        this.setState({
          selectedLocation: {
            adress: selectedAdress,
            latitude: responseJson.results[0].geometry.location.lat,
            longitude: responseJson.results[0].geometry.location.lng,
          },
          regionChangeProgress: false,
        });
        console.log('selected pos', this.state.selectedLocation);
      });
  };

  // Update state on region change
  onRegionChange = (region) => {
    console.log('onRegionChange', region);
    this.setState(
      {
        region,
        regionChangeProgress: true,
      },
      () => this.fetchAddress(),
    );
  };

  onMarkerPressed = (location, index) => {
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    // this._carousel.snapToItem(index);
  };

  renderCarouselItem = ({item}) => (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Image style={styles.cardImage} source={item.image} />
    </View>
  );

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        {!this.state.image ? (
          <View style={{flex: 1}}>
            <MapView
              provider={PROVIDER_GOOGLE}
              draggable
              ref={(map) => (this._map = map)}
              showsUserLocation={true}
              style={{
                flex: 8,
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
              }}
              initialRegion={this.state.initialPosition}
              onMapReady={this.onMapReady}
              onRegionChangeComplete={this.onRegionChange}>
              {this.state.selectedLocation ? (
                <Marker
                  draggable
                  coordinate={{
                    latitude: this.state.selectedLocation.latitude,
                    longitude: this.state.selectedLocation.longitude,
                  }}>
                  <Callout onPress={this.showWelcomeMessage}>
                    <Text>is it an interesting place?</Text>
                  </Callout>
                </Marker>
              ) : (
                []
              )}
              {this.props.myPlaces.map((place, index) => (
                <Marker
                  key={place.desc}
                  ref={(ref) => (this.state.markers[index] = ref)}
                  //   onPress={() => this.onMarkerPressed(place, index)}
                  pinColor={colors.blue}
                  coordinate={{
                    latitude: place.location.latitude,
                    longitude: place.location.longitude,
                  }}>
                  <Callout>
                    <Text>{place.desc}</Text>
                  </Callout>
                </Marker>
              ))}
            </MapView>
            <View style={styles.detailSection}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontFamily: 'roboto',
                }}>
                Move map for location
              </Text>
              <Text style={{fontSize: 10, color: '#999'}}>LOCATION</Text>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  paddingVertical: 10,
                  borderBottomColor: 'silver',
                  borderBottomWidth: 0.5,
                }}>
                {!this.state.regionChangeProgress
                  ? this.state.selectedLocation.adress
                  : 'Identifying Location...'}
              </Text>
              <Button
                style={styles.customButtonSelect}
                text={'Select Image for this place'}
                disabled={this.state.regionChangeProgress}
                onPress={() => {
                  if (!this.state.imageSelectTapped) {
                    this.selectImage();
                    this.setState({imageSelectTapped: true});
                  }
                }}></Button>
              {/* <Button
                style={styles.customButtonSelect}
                text={'Do you want to show nearest favorite places?'}
                onPress={() => {
                  this.setState({shownFavorites: true});
                }}></Button> */}
            </View>
          </View>
        ) : (
          <View>
            <Image
              source={{uri: this.state.image}}
              style={{
                width: '100%',
                height: '70%',
              }}
              resizeMode="contain"
            />

            <TextInput
              multiline
              autoCompleteType="off"
              placeholder="Now, enter a description for this place"
              style={{
                width: '60%',
                height: '10%',
                alignSelf: 'center',
                fontSize: fonts.small,
              }}
              placeholderTextColor="black"
              onChangeText={(value) => {
                this.setState({desc: value});
              }}></TextInput>
            <Button
              style={styles.customButtonAdd}
              text={'Add in your favorites!'}
              onPress={() => {
                const params = {
                  placeName: null, //there should be original name if there is any, to keep track how many people liked it
                  user: this.props.user.uid,
                  desc: this.state.desc,
                  image: this.state.image,
                  createdDate: new Date(),
                  location: this.state.selectedLocation,
                };
                //comment could be available when it is open to friendList/friendGroup friend degilken sadece kac tane favori place I var  onu gorebiliyosun.
                if (this.state.desc) {
                  this.props.addPersonalPlace(params);
                  this.setState({image: null});
                  console.log('after post', this.state.image);
                } else {
                  Alert.alert(
                    'Hey',
                    'please enter how you want to remember this place',
                  );
                }
              }}></Button>
          </View>
        )}

        {/* <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={this.state.coordinates}
          containerCustomStyle={styles.carousel}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange(index)}
        /> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 48,
  },
  cardContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    height: 200,
    width: 300,
    padding: 24,
    borderRadius: 24,
  },
  cardImage: {
    height: 120,
    width: 300,
    bottom: 0,
    position: 'absolute',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardTitle: {
    color: 'white',
    fontSize: 22,
    alignSelf: 'center',
  },
  customButtonAdd: {
    color: 'white',
    alignSelf: 'center',
    width: '60%',
    height: '10%',
  },
  customButtonSelect: {
    color: 'white',
    alignSelf: 'center',
    width: '60%',
    height: '30%',
  },

  detailSection: {
    width: '100%',
    flex: 2,
    backgroundColor: '#fff',
  },

  btnContainer: {
    width: '50%',
    height: '100%',
  },
});

const mapStateToProps = ({placeResponse, authResponse}) => {
  const {myPlaces} = placeResponse;
  const {user} = authResponse;
  return {myPlaces, user};
};

export default connect(mapStateToProps, {addPersonalPlace})(AddLocation);
