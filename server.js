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

//Import admin controller
const {
  getUsers,
  verifyUser,
  rejectUser, 
  getUser,
} = require("./controllers/adminController");

app.use(express.static(__dirname + "/data"));

/* USER ROUTES */
app.post("/signup", signup); //Register to system
app.post("/login", login); //Log existing user
app.get("/user", auth(), getLoggedUser); //Get information about logged in user
app.get("/users", auth("admin"), getUsers); //Get all users pending for verification
app.get("/user/:id", auth(), getUser); //Get information about a specific user
app.get("/user/set-verified/:id", auth("admin"), verifyUser); //Verify new user to the system
app.get("user/set-notverified/:id", auth("admin"), rejectUser); //Reject new user

module.exports = http.createServer(app);
