const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const morgan = require("morgan");

const auth = require("./middleware/auth");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Import user controllers
const {
  signup,
  login,
  getLoggedUser,
} = require("./controllers/userController");

app.use(express.static(__dirname + "/data"));

/* USER ROUTES */
app.post("/signup", signup); //Register to system
app.post("/login", login); //Log existing user
app.get("/user", auth(), getLoggedUser); //Get information about logged in user

module.exports = http.createServer(app);
