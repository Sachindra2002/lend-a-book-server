const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    isbn: {
      type: Number,
      required: true,
    },

    bookName: {
      type: String,
      required: true,
    },

    authorName: {
      type: String,
      required: true,
    },

    bookGenre: {
      type: String,
      required: true,
    },

    is18: {
      type: Boolean,
      required: true,
    },

    bookTitle: {
      type: String,
      required: true,
    },

    publisher: {
      type: String,
      required: true,
    },

    bookYear: {
      type: String,
      required: true,
    },

    bookImage: {
      type: String,
      required: true,
    },

    bookFile: {
      type: String,
      required: true,
    },

    isAvailableOnline: {
      type: Boolean,
      required: true,
    },

    isAvailable: {
      type: Boolean,
      required: true,
    },

    bookSummary: {
      type: String,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BookMdb = mongoose.model('Book', bookSchema);

module.exports = BookMdb;
