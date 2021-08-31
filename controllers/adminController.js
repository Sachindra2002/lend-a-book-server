const { request, response } = require("express");
const { sequelize, User, Subscription, Book, Movie } = require("../models");
const formidable = require("formidable");
const fs = require("fs");
const mv = require("mv");

/*Get all user pending for verification */
exports.getUsers = async (request, response) => {
  try {
    const users = await User.findAll({
      attributes: [
        "email",
        "firstName",
        "lastName",
        "isVerified",
        "isBanned",
        "image",
        "phoneNumber",
        "dob",
      ],
    });

    return response.status(200).json({ users });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/* Verify new user (change isVerified property) */
exports.changeIsVerified = async (request, response) => {
  try {
    const id = request.params.id;
    let user = await User.findOne({ where: { email: id } });

    user.isVerified = !user.isVerified;

    user.save();

    //send success email

    return response.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/* Ban and un-ban a user (change isBanned property) */
exports.changeIsBanned = async (request, response) => {
  try {
    const id = request.params.id;
    let user = await User.findOne({ where: { email: id } });

    user.isBanned = !user.isBanned;

    user.save();

    //send ban email along with transaction reversal

    return response.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/*Get info of certain user*/
exports.getUser = async (request, response) => {
  const id = request.params.id;

  try {
    let user = await User.findOne({
      where: { email: id },
      include: [Subscription],
      attributes: [
        "email",
        "firstName",
        "lastName",
        "image",
        "isVerified",
        "isBanned",
        "phoneNumber",
        "dob",
      ],
    });
    if (!user)
      return response
        .status(404)
        .json({ error: { message: "User not found" } });

    //If user calling the request is not admin and if the data is not the user's data
    if (
      JSON.stringify(user.email) !== JSON.stringify(request.user.email) &&
      request.user.userRole !== "admin"
    )
      return response.status(403).json({ error: "Unauthorized" });

    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

/* Add Book to the system */
exports.addBook = async (request, response) => {
  var formData = new formidable.IncomingForm();
  formData.parse(request, async (error, fields, files) => {
    const isbn = fields.isbn;
    const bookName = fields.bookName;
    const bookTitle = fields.title;
    const authorName = fields.authorName;
    const publisher = fields.publisher;
    const bookYear = fields.year;
    const bookGenre = fields.genre;
    const isBook18 = fields.is18;
    const bookSummary = fields.summary;
    const is18 = false;
    console.log(fields);

    if (isBook18 === "Yes") {
      is18 = true;
    }

    const new_book = {
      isbn,
      bookName,
      authorName,
      bookGenre,
      is18,
      bookTitle,
      publisher,
      bookYear,
      bookImage: "null",
      bookFile: "null",
      isAvailableOnline: true,
      isAvailable: true,
      bookSummary,
    };

    try {
      //Find book through ISBN number
      const _book = await Book.findOne({
        where: { isbn: isbn },
      });

      //If ISBN exists
      if (_book)
        return response
          .status(400)
          .json({ error: { isbn: "Book already exists" } });

      const book = await Book.create(new_book);

      //Save Books' cover image
      var imageExtension = files.imageFile.name.substr(
        files.imageFile.name.lastIndexOf(".")
      );
      var imageOldPath = files.imageFile.path;
      var newImagePath = "./data/books/" + fields.isbn + imageExtension;
      mv(imageOldPath, newImagePath, async (errorRename) => {
        console.log("File saved = " + newImagePath);
        console.log(errorRename);
      });

      const bookImage = await Book.findByPk(isbn);
      bookImage.bookImage =
        "http://localhost:5000/books/" + fields.isbn + imageExtension;

      bookImage.save();

      //Save Books' PDF file
      var pdfExtension = files.bookFile.name.substr(
        files.bookFile.name.lastIndexOf(".")
      );
      var pdfOldPath = files.bookFile.path;
      var newPdfPath = "./data/pdfs/" + fields.isbn + pdfExtension;
      mv(pdfOldPath, newPdfPath, async (errorRename) => {
        console.log("File saved = " + newPdfPath);
        console.log(errorRename);
      });

      const bookFile = await Book.findByPk(isbn);
      bookFile.bookFile =
        "http://localhost:5000/pdfs/" + fields.isbn + pdfExtension;

      bookFile.save();

      return response.status(201).json(book);
    } catch (error) {
      return response.status(500).json({ error });
    }
  });
};

/* Get information on all books */
exports.getAllBooks = async (request, response) => {
  try {
    const books = await Book.findAll();
    return response.status(200).json({ books });
  } catch (error) {
    return response.status(500).json({ error });
    console.log(error);
  }
};

/*Get information on a single book */
exports.getBook = async (request, response) => {
  try {
    const id = request.params.id;
    let book = await Book.findByPk(id);
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/* Toggle book availability */
exports.toggleAvailability = async (request, response) => {
  book_id = request.params.id;

  try {
    let book = await Book.findByPk(book_id);

    if (!book) return response.status(400).json({ error: "Book not found" });

    book.isAvailable = !book.isAvailable;
    book.save();

    return response
      .status(200)
      .json({ message: "Book availability successfully changed" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

/* Delete Book from Database */
exports.deleteBook = async (request, response) => {
  try {
    const id = request.params.id;

    //Check if members have reservations

    //Delete the book
    Book.destroy({ where: { isbn: id } });
    return response.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/* Add Movie to the system */
exports.addMovie = async (request, response) => {
  var formData = new formidable.IncomingForm();
  formData.parse(request, async (error, fields, files) => {
    const movieName = fields.movieTitle;
    const director = fields.director;
    const movieYear = fields.year;
    const imdbScore = fields.imdb;
    const movieGenre = fields.genre;
    const isMovie18 = fields.is18;
    const movieSummary = fields.summary;
    const is18 = false;
    console.log(files);
    console.log(fields);

    if (isMovie18 === "Yes") {
      is18 = true;
    }

    const new_movie = {
      movieName,
      imdbScore,
      director,
      movieGenre,
      is18,
      movieYear,
      movieImage: "null",
      movieFile: "null",
      isAvailableOnline: true,
      isAvailable: true,
      movieSummary,
    };

    try {
      //Find movie through title
      const _movie = await Movie.findOne({
        where: { movieName: movieName },
      });

      //If movie exists
      if (_movie)
        return response
          .status(400)
          .json({ error: { movieName: "Movie already exists" } });

      const movie = await Movie.create(new_movie);

      //Save Movies' cover image
      var imageExtension = files.imageFile.name.substr(
        files.imageFile.name.lastIndexOf(".")
      );
      var imageOldPath = files.imageFile.path;
      var newImagePath = "./data/movies/" + movie.id + imageExtension;
      mv(imageOldPath, newImagePath, async (errorRename) => {
        console.log("File saved = " + newImagePath);
        console.log(errorRename);
      });

      const movieImage = await Movie.findByPk(movie.id);
      movieImage.movieImage =
        "http://localhost:5000/movies/" + movie.id + imageExtension;

      movieImage.save();

      //Save Movies' mp4 file
      var mp4Extension = files.movieFile.name.substr(
        files.movieFile.name.lastIndexOf(".")
      );
      var mp4OldPath = files.movieFile.path;
      var newMp4Path = "./data/videos/" + movie.id + mp4Extension;
      mv(mp4OldPath, newMp4Path, async (errorRename) => {
        console.log("File saved = " + newMp4Path);
        console.log(errorRename);
      });

      const movieFile = await Movie.findByPk(movie.id);
      movieFile.movieFile =
        "http://localhost:5000/videos/" + movie.id + mp4Extension;

      movieFile.save();

      return response.status(201).json(movie);
    } catch (error) {
      return response.status(500).json({ error });
      console.log({ error });
    }
  });
};

/* Get information on all movies */
exports.getAllMovies = async (request, response) => {
  try {
    const movies = await Movie.findAll();
    return response.status(200).json({ movies });
  } catch (error) {
    return response.status(500).json({ error });
    console.log(error);
  }
};

/*Get information on a single movie */
exports.getMovie = async (request, response) => {
  try {
    const id = request.params.id;
    let movie = await Movie.findByPk(id);
    return response.status(200).json(movie);
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/* Toggle movie availability */
exports.toggleMovieAvailability = async (request, response) => {
  movie_id = request.params.id;

  try {
    let movie = await Movie.findByPk(movie_id);

    if (!movie) return response.status(400).json({ error: "Movie not found" });

    movie.isAvailable = !movie.isAvailable;
    movie.save();

    return response
      .status(200)
      .json({ message: "Movie availability successfully changed" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};

/* Delete Movie from Database */
exports.deleteMovie = async (request, response) => {
  try {
    const id = request.params.id;

    //Check if members have reservations

    //Delete the movie
    Movie.destroy({ where: { id: id } });
    return response.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
