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
  getAllUserPersonalizedBooks,
  getAllUserPersonalizedMovies,
} = require("./controllers/userController");

//Import admin controller
const {
  getUsers,
  changeIsVerified,
  changeIsBanned,
  getUser,
  addBook,
  addBookFromCSV,
  addBookToMongoDB,
  getAllBooks,
  getAllMongoBooks,
  getBook,
  toggleAvailability,
  deleteBook,
  addMovie,
  getAllMovies,
  getMovie,
  toggleMovieAvailability,
  deleteMovie,
  addBookFromMongo,
} = require("./controllers/adminController");

const {
  saveOrder,
  setReservationStatus,
  getAllBookReservations,
  getBookReservations,
} = require("./controllers/reservationController");

const {
  getAllBookComments,
  addCommentBook,
  deleteComment,
} = require("./controllers/commentsController");

const { webScrapeBook } = require("./controllers/webScrapeController");

const { getCSVData, getCSVMovieData } = require("./controllers/csvFileManageController");

app.use(express.static(__dirname + "/data"));

/* USER ROUTES */
app.post("/signup", signup); //Register to system
app.post("/login", login); //Log existing user
app.get("/user", auth(), getLoggedUser); //Get information about logged in user
app.get("/users", auth("admin"), getUsers); //Get all users pending for verification
app.get("/user/:id", auth(), getUser); //Get information about a specific user
app.get("/user/set-verified/:id", auth("admin"), changeIsVerified); //Verify or remove verify user to the system
app.get("/user/set-ban/:id", auth("admin"), changeIsBanned); //Ban or un-ban an user
app.post("/reserve", auth(), saveOrder);

/* USER PERSONALIZED CONTENT */
app.get("/user-books", auth(), getAllUserPersonalizedBooks); // Get personalized books for user
app.get("/user-movies", auth(), getAllUserPersonalizedMovies); //Get personalized movies for user

/* COMMENT ROUTES */
app.get("/book-comments/:id", auth(), getAllBookComments); //Get comments for a book
app.post("/add-comment", auth(), addCommentBook); //Add comment to a book
app.post("/delete-comment/:id", auth(), deleteComment); //Delete Comment

/* BOOK ROUTES */
app.post("/book", auth("admin"), addBook); //Add book to the system
app.get("/books", getAllBooks); //Get all books in the system
app.get("/book/:id", auth(), getBook); //Get a single book's information
app.get("/book-availability/:id", auth("admin"), toggleAvailability); // Toggle availability of book
app.delete("/book/:id", auth("admin"), deleteBook); //Delete Book

/* MOVIE ROUTES */
app.post("/movie", auth("admin"), addMovie); //Add movie to the system
app.get("/movies", getAllMovies); //Get all movies in the system
app.get("/movie/:id", auth(), getMovie); // Get a single movies' information
app.get("/movie-availability/:id", auth("admin"), toggleMovieAvailability); // Toggle availability of movie
app.delete("/movie/:id", auth("admin"), deleteMovie); // Delete Movie

/* RESERVATION ROUTES */
app.get("/book-reservations", auth("admin"), getAllBookReservations); //Get all reservations for books
app.post("/reservation-status/:id", auth("admin"), setReservationStatus); //Update reservation status
app.get("/my-bookReservations", auth(), getBookReservations);


/*WEB SCRAPING*/
app.get("/new-books", webScrapeBook); //SCRAPE BOOKS

/* CSV ROUTES */
app.get("/purchased-books", getCSVData); //Get CSV data
app.get("/purchased-movies", getCSVMovieData); //Get CSV movie data
app.post("/add-book", auth("admin"), addBookFromCSV); //Add book from CSV file to database

/* SECONDARY DATABASE ROUTES */
app.post("/add-book-mongo", addBookToMongoDB); //Add books to secondary database
app.post("/add-book-to-mongo-sql", addBookFromMongo)
app.get("/mongo-books", auth("admin"), getAllMongoBooks); //Get all books from secondary database

module.exports = http.createServer(app);
