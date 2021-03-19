const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors");

const { signup, signin, protect } = require("./Utils/middleware");
app.use(cors());
app.use(bodyParser.json());
//app.use(cookieParser());

//Auth Routes
app.post("/signup", signup);
app.post("/signin", signin);
app.get("/", protect);
//app.use('/', protect); //in this react native project react native router is checking if the user is authorized before showing the other screens so no need to check this on each request
// Sub Routes
const usersRoute = require("./routes/users.router");
app.use("/users", usersRoute);

const placesRoute = require("./routes/places.router");
app.use("/places", placesRoute);

const messagesRoute = require("./routes/messages.router");
app.use("/messages", messagesRoute);

const friendgroupsRoute = require("./routes/friendGroups.router");
app.use("/friendgroups", friendgroupsRoute);

//Connect To Db
const mongodb_uri = `mongodb+srv://merve_erdogmus:${27572757}@cluster0.4aoqe.mongodb.net/favoriteSpots?retryWrites=true&w=majority`;
mongoose.connect(
  mongodb_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connected to DB");
  }
);

app.listen(3000);
