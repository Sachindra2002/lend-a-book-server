const { request, response } = require("express");
const { sequelize, User, Subscription, Book } = require("../models");
const formidable = require("formidable");

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

exports.getBook = async (request, response) => {
  try {
    const id = request.params.id;
    let book = await Book.findByPk(id);
    return response.status(200).json(book);
  } catch (error) {
    return response.status(500).json({ error });
  }
}
