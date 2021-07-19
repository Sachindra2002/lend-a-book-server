const server = require("./server");
const express = require("express");
const { sequelize } = require("./models");

server.listen({ port: 5000 }, async () => {
  console.log("Server running on http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database Connected");
});
