const { request, response } = require("express");
const csv = require("csv-parser");
const formidable = require("formidable");
const fs = require("fs");
const mv = require("mv");

exports.getCSVData = async (request, response) => {
  try {
    const books = [];

    fs.createReadStream("purchased-books.csv")
      .pipe(csv({}))
      .on("data", (data) => books.push(data))
      .on("end", () => {
        return response.status(200).json({ books });
      });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error });
  }
};
