const { request, response } = require("express");
const { sequelize, User } = require("../models");
const bcrypt = require("bcrypt");
const { validateRegister } = require("../utils/validators");

/* Register User */
exports.signup = async (request, response) => {
  var today = new Date();

  const todayDate = new Date();
  var dd = String(todayDate.getDate()).padStart(2, "0");
  var mm = String(todayDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = todayDate.getFullYear();
  todayDate = yyyy + "/" + mm + "/" + dd;

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const email = request.body.email;
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const dob = request.body.dob;
  const phoneNumber = request.body.phoneNumber;
  const password = request.body.password;
  const confirmPassword = request.body.confirmPassword;
  const year = new Date(dob);
  const age = today.getFullYear() - year.getFullYear();
  const creditCardNumber = request.body.creditCardNumber;
  const creditCardExpiryDate = request.body.creditCardExpiryDate;
  const creditCardCvv = request.body.creditCardCvv;
  const option = request.body.option;
  const totalAmount = request.body.totalAmount;

  const new_user = {
    email,
    firstName,
    lastName,
    dob,
    age,
    phoneNumber,
    password,
    confirmPassword,
    image: "null",
    isVerified: 0,
    isBanned: 0,
    userRole: "member",
  };

  try {
    let errors = await validateRegister(new_user);

    if (Object.keys(errors).length > 0)
      return response.status(400).json({ error: errors });

    //Hash password
    new_user.password = new_user.password
      ? await bcrypt.hash(new_user.password, 6)
      : null;

    //create new user object in database
    const user = await User.create(new_user);

    return response.json(user);
  } catch (err) {
    console.log(err);
    return response.status(500).json(err);
  }
};
