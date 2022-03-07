const server = require("./server");
const express = require("express");
const { sequelize } = require("./models");
const mongoose = require("mongoose");

//Connect to MongoDB
const mdbURI =
  "mongodb+srv://Sachindra:Sachindraisstrong@lendabook.wgu4r.mongodb.net/lend-a-book?retryWrites=true&w=majority";

server.listen({ port: 5000 }, async () => {
  console.log("Server running on http://localhost:5000");
  mongoose
    .connect(mdbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MOGODB database!");
    })
    .then( async () => {
      await sequelize.authenticate();
    })
    .then(() => {
      console.log("Connected to primary database!");
    })
    .catch((error) => {
      console.log(error);
    });
});
