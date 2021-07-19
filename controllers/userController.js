const { request, response } = require("express");
const { sequelize, User } = require("../models");

/* Register User */
exports.signup = async (request, response) => {
  const new_user = {
    email: request.body.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    dob: request.body.dob,
    age: request.body.age,
    phoneNumber: request.body.phoneNumber,
    image: "null",
    isVerified: 0,
    isBanned: 0,
    password: request.body.password,
    userRole: "member",
  };

  try {
    const user = await User.create(new_user);
    return response.json(user);
  } catch (err) {
    console.log(err);
    return response.status(500).json(err);
  }
};

