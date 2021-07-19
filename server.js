const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
app.use(cors());
app.use(express.json());

//Import user controllers
const { signup } = require("./controllers/userController");

/* USER ROUTES */
app.post("/signup", signup); //Register to system

module.exports = http.createServer(app);
