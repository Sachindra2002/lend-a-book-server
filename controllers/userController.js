const { request, response } = require("express");
const { sequelize, User } = require("../models");

/* Register User */
exports.signup = async (request, response) => {

  var today = new Date();

  const email = request.body.email;
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const dob = request.body.dob;
  const phoneNumber = request.body.phonenumber;
  const password = request.body.password;
  const year = new Date(dob);
  const age = today.getFullYear() - year.getFullYear();

  const new_user = {
    email,
    firstName,
    lastName,
    dob,
    age,
    phoneNumber,
    password,
    image: "null",
    isVerified: 0,
    isBanned: 0,
    userRole: "member",
  };

  try {
    const user = await User.create(new_user);
    return response.json(user);
    console.log(age);
  } catch (err) {
    console.log(err);
    return response.status(500).json(err);
  }
};

