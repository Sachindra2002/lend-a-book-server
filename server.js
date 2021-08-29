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
  changeIsVerified,
  changeIsBanned, 
  getUser,
  addBook,
  getAllBooks,
  getBook,
  toggleAvailability,
  addMovie,
  getAllMovies,
  getMovie,
} = require("./controllers/adminController");

app.use(express.static(__dirname + "/data"));

/* USER ROUTES */
app.post("/signup", signup); //Register to system
app.post("/login", login); //Log existing user
app.get("/user", auth(), getLoggedUser); //Get information about logged in user
app.get("/users", auth("admin"), getUsers); //Get all users pending for verification
app.get("/user/:id", auth(), getUser); //Get information about a specific user
app.get("/user/set-verified/:id", auth("admin"), changeIsVerified); //Verify or remove verify user to the system
app.get("/user/set-ban/:id", auth("admin"), changeIsBanned); //Ban or un-ban an user

/* BOOK ROUTES */
app.post("/book", auth("admin"), addBook); //Add book to the system
app.get("/books", getAllBooks); //Get all books in the system
app.get("/book/:id", auth(), getBook); //Get a single book's information
app.get("/book-availability/:id", auth("admin"), toggleAvailability);

/* MOVIE ROUTES */
app.post("/movie", auth("admin"), addMovie); //Add movie to the system
app.get("/movies", getAllMovies); //Get all movies in the system
app.get("/movie/:id", auth(), getMovie); // Get a single movies' information

module.exports = http.createServer(app);
