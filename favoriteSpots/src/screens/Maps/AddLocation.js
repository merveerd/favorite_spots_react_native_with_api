const axios = require("axios");
import React, {Component} from "react";
import {connect} from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import {request, PERMISSIONS} from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
//import Carousel from 'react-native-snap-carousel';
import ImagePicker from "react-native-image-picker";
import {TextInput} from "react-native-gesture-handler";
import {addPlace} from "../../actions";
import {fonts, colors} from "../../style";
import {Button, SearchBar, SearchList} from "../../components";
//callout text can be varied, randomly shown. Do yo like this place, let's make it memorable.
class AddLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      desc: null,
      markers: [],
      isMapReady: false,
      isPressEnabled: false,
      shownFavorites: false,
      selectedLocation: {
        longitude: 0,
        latitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      selectedAdress: "",
      placeId: "",
      placeName: "",
      imageSelected: false,
      searchKeyword: "",
      searchResults: [],
      isShowingResults: true,

      region: {
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      regionChangeProgress: false,
    };
    this.selectionTapRef = React.createRef();
  }

  componentDidMount() {
    this.selectionTapRef.current.addEventListener("mouseenter", () => {
      console.log("Regular Mouse Enter Event");
    });
  }
  componentDidMount() {
    this.requestLocationPermission();
  }

  handleMapPress = (e) => {
    this.setState(
      {
        selectedLocation: {
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          longitudeDelta: 0.003,
          latitudeDelta: 0.003,
        },
      },
      () => {
        console.log("press");
        this.getPressedLocation(); //to make sure state changes have been recognized
      },
    );
  };
  onMapReady = () => {
    this.setState({isMapReady: true});
  };

  selectImage() {
    const options = {
      title: "Profil Fotoğrafı Seçiniz",
      quality: 0.2,
      takePhotoButtonTitle: "Resim Çek",
      chooseFromLibraryButtonTitle: "Galeriden Seç",
      cancelButtonTitle: "Kapat",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const uri = response.uri;
        this.setState({image: uri});
        this.setState({imageSelected: true});
      }
    });
  }

  requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (response === "granted") {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (response === "granted") {
        this.locateCurrentPosition();
      }
    }
  };

  searchLocation = async (text) => {
    if (text.length >= 3) {
      axios
        .request({
          method: "post",

          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDETQ1fCUl8u3oXaIhQEL0roq7HDeRaddQ&input=${text}`,
        })
        .then((response) => {
          this.setState({
            searchResults: response.data.predictions,
            //isShowingResults: true,
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
      return;
    }
    this.setState({
      searchResults: [],
      //isShowingResults: true,
    });
  };

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };

        this.setState({region: initialPosition});
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  // Fetch location details as a JOSN from google map API
  getPressedLocation = () => {
    this.setState({placeName: ""});
    //only for no-name places
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        this.state.selectedLocation.latitude +
        "," +
        this.state.selectedLocation.longitude +
        "&key=" +
        "AIzaSyDETQ1fCUl8u3oXaIhQEL0roq7HDeRaddQ",
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson);
        this.setState({
          selectedLocation: {
            ...this.state.selectedLocation,
            latitude: responseJson.results[0].geometry.location.lat,
            longitude: responseJson.results[0].geometry.location.lng,
          },
          selectedAdress: responseJson.results[0].formatted_address,
        });
      });
  };

  // Update state on region change
  createMarker = (region) => {
    this.setState({
      region,
      regionChangeProgress: true,
    });
  };

  getSelectedLocation = (item) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=${item.place_id}&key=AIzaSyDETQ1fCUl8u3oXaIhQEL0roq7HDeRaddQ`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          selectedLocation: {
            latitude: responseJson.result.geometry.location.lat,
            longitude: responseJson.result.geometry.location.lng,
            longitudeDelta: 0.003,
            latitudeDelta: 0.003,
          },
          regionChangeProgress: false,
          selectedAdress: responseJson.result.formatted_address,
          placeName: responseJson.result.name,
          placeId: responseJson.result.place_id,
        });

        this.createMarker(this.state.selectedLocation);
      });

    this.setState({
      searchResults: [],
      searchKeyword: "",
      //isShowingResults: true,
    });
  };

  openTapSelectionWarning = () => {
    console.log("openTapSelectionWarning for anonymous adresses");
    alert("Please select");
  };

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
            <SearchBar
              placeholder="search for a place"
              onChangeText={(text) => {
                this.setState({searchKeyword: text});
                this.searchLocation(text);
              }}
              value={this.state.searchKeyword}
            />
            {this.state.searchResults.length > 0 ? (
              <SearchList
                searchResults={this.state.searchResults}
                onPress={this.getSelectedLocation}
                text="description"
              />
            ) : (
              []
            )}
            <MapView
              provider={PROVIDER_GOOGLE}
              draggable
              ref={(map) => (this._map = map)}
              showsUserLocation={true}
              style={{
                flex: 8,
                width: "100%",
                height: "100%",
                justifyContent: "flex-end",
              }}
              // initialRegion={this.state.region}
              onMapReady={this.onMapReady}
              onPress={(e) =>
                this.state.isPressEnabled && this.handleMapPress(e)
              }
              region={this.state.region}>
              {this.state.selectedLocation.latitude ? (
                <Marker
                  draggable
                  coordinate={{
                    latitude: this.state.selectedLocation.latitude,
                    longitude: this.state.selectedLocation.longitude,
                  }}>
                  <Callout>
                    <Text>
                      Is it an interesting place? Let's save for the records
                    </Text>
                  </Callout>
                </Marker>
              ) : (
                []
              )}
              {/* {this.props.user.places.map((place, index) => (
                // <Marker
                //   key={place.desc}
                //   ref={(ref) => (this.state.markers[index] = ref)}
                //   onPress={() => this.onMarkerPressed(place, index)}
                //   pinColor={colors.blue}
                //   coordinate={{
                //     latitude: place.location.latitude,
                //     longitude: place.location.longitude,
                //   }}>
                //   <Callout>
                //     <Text>{place.desc}</Text>
                //   </Callout>
                // </Marker>
              ))} */}
            </MapView>
            <View style={styles.detailSection}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "roboto",
                }}>
                {this.state.placeName}
                {this.state.selectedAdress}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.purple,
                  borderRadius:
                    Math.round(
                      Dimensions.get("window").width +
                        Dimensions.get("window").height,
                    ) / 2,
                  width: Dimensions.get("window").width * 0.1,
                  height: Dimensions.get("window").width * 0.1,
                }}
                ref={this.ref}
                text={"tap selection"}
                onMouseOver={() => {
                  this.openTapSelectionWarning();
                }}
                onPress={() => {
                  this.setState((prevState) => ({
                    isPressEnabled: !prevState.isPressEnabled,
                  }));
                }}></TouchableOpacity>
              <Button
                style={styles.customButtonSelect}
                text={"Save the place"}
                disabled={this.state.regionChangeProgress}
                onPress={() => {
                  this.selectImage();
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
          //BACK Butonu ekle resmi degistirmek icin
          <View>
            <Image
              source={{uri: this.state.image}}
              style={{
                width: "100%",
                height: "70%",
              }}
              resizeMode="contain"
            />

            <TextInput
              multiline
              autoCompleteType="off"
              placeholder="Now, enter a description for this place"
              style={{
                width: "60%",
                height: "10%",
                alignSelf: "center",
                fontSize: fonts.small,
              }}
              placeholderTextColor="black"
              onChangeText={(value) => {
                this.setState({desc: value});
              }}></TextInput>
            <Button
              style={styles.customButtonAdd}
              text={"Add in your favorites!"}
              onPress={() => {
                const params = {
                  place: {
                    _id: this.state.placeId,
                    placeName: this.state.placeName, //there should be original name if there is any, to keep track how many people liked it
                    location: {
                      type: "Point",
                      coordinates: [
                        this.state.selectedLocation.longitude,
                        this.state.selectedLocation.latitude,
                      ],
                      address: this.state.selectedAdress,
                    },
                  },
                  user: this.props.user,
                  personalPlaceInfo: {
                    desc: this.state.desc,
                    image: this.state.image,
                    createdDate: new Date(),
                  },
                };

                //comment could be available when it is open to friendList/friendGroup friend degilken sadece kac tane favori place I var  onu gorebiliyosun.
                if (this.state.desc) {
                  this.props.addPlace(params);
                  this.setState({image: null});
                  this.locateCurrentPosition();
                } else {
                  Alert.alert(
                    "Hi",
                    "please enter a few words for how you want to remember this place",
                  );
                }
              }}></Button>
          </View>
        )}
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

  customButtonAdd: {
    color: "white",
    alignSelf: "center",
    width: "60%",
    height: "10%",
  },
  customButtonSelect: {
    color: "white",
    alignSelf: "center",
    width: "60%",
    height: "30%",
  },

  detailSection: {
    width: "100%",
    flex: 2,
    backgroundColor: "#fff",
  },

  item: {
    padding: 10,
    marginHorizontal: 16,
  },
});

const mapStateToProps = ({placeResponse, authResponse}) => {
  const {myPlaces} = placeResponse;
  const {user} = authResponse;
  return {myPlaces, user};
};

export default connect(mapStateToProps, {addPlace})(AddLocation);
