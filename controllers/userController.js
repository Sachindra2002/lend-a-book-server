const { request, response } = require("express");
const { sequelize, User, Subscription } = require("../models");
const bcrypt = require("bcrypt");
const { validateRegister } = require("../utils/validators");

/* Register User */
exports.signup = async (request, response) => {
  var today = new Date();

  var subscriptionStartDate = new Date();
  var dd = String(subscriptionStartDate.getDate()).padStart(2, "0");
  var mm = String(subscriptionStartDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = subscriptionStartDate.getFullYear();
  subscriptionStartDate = yyyy + "/" + mm + "/" + dd;

  var subscriptionEndDate = new Date();
  subscriptionEndDate =
    subscriptionEndDate.getFullYear() + 1 + "/" + mm + "/" + dd;

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
  const membershipOption = request.body.option;
  const totalAmountPaid = request.body.totalAmount;
  const balanceLeft = "0.0";

  var tmp_path = request.files.image.path;
  console.log(tmp_path);

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

  const new_subscription = {
    email,
    membershipOption,
    subscriptionStartDate,
    subscriptionEndDate,
    totalAmountPaid,
    balanceLeft,
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

    //Image upload for verification 
    
    

    //create subscription object of newly registered user in database
    const subscription = await Subscription.create(new_subscription);

    //return response.json(user);
  } catch (err) {
    console.log(err);
    return response.status(500).json(err);
  }
};