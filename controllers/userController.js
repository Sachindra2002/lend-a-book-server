const { request, response } = require("express");
const {
  sequelize,
  User,
  Subscription,
  PaymentMethod,
  Book,
  Movie,
  Comment,
} = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.json");
const { validateRegister } = require("../utils/validators");
const { uploadUserImages } = require("../helper/image-uploader");
const formidable = require("formidable");
const fs = require("fs");
const mv = require("mv");

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

  var formData = new formidable.IncomingForm();
  formData.parse(request, async (error, fields, files) => {
    const email = fields.email;
    const firstName = fields.firstName;
    const lastName = fields.lastName;
    const dob = fields.dob;
    const phoneNumber = fields.phoneNumber;
    const password = fields.password;
    const confirmPassword = fields.confirmPassword;
    const year = new Date(dob);
    const age = today.getFullYear() - year.getFullYear();
    const creditcardnumber = fields.creditCardNumber;
    const creditcardexpdate = fields.creditCardExpiryDate;
    const creditcardcvv = fields.creditCardCvv;
    const membershipOption = fields.option;
    const totalAmountPaid = fields.totalAmount;
    const balanceLeft = "0.0";
    console.log(files);

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

    const new_paymentmethod = {
      email,
      creditcardnumber,
      creditcardexpdate,
      creditcardcvv,
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

      //create subscription object of newly registered user in database
      const subscription = await Subscription.create(new_subscription);

      //create payment method object of newly registered user in database
      const paymentmethod = await PaymentMethod.create(new_paymentmethod);

      //Save user's image URL for registration
      var extension = files.file.name.substr(files.file.name.lastIndexOf("."));
      var oldpath = files.file.path;
      console.log(oldpath);
      var newPath = "./data/registration/" + fields.email + extension;
      mv(oldpath, newPath, async (errorRename) => {
        console.log("File saved = " + newPath);
        console.log(errorRename);
      });

      const userImage = await User.findOne({ where: { email: email } });

      userImage.image =
        "http://localhost:5000/registration/" + fields.email + extension;

      userImage.save();

      //send success email with bank transaction

      //Generate JWT token
    } catch (err) {
      console.log(err);
      return response.status(500).json(err);
    }
  });
};

/* Log existing user */
exports.login = async (request, response) => {
  const { email, password } = request.body;
  let errors = {};

  try {
    if (!email || email.trim() === "") errors.email = "Email must not be empty";

    if (!password || password.trim() === "")
      errors.password = "Password should not be empty";

    //if errors exist send response JSON with errors
    if (Object.keys(errors).length > 0)
      return response.status(400).json({ error: errors });

    const user = await User.findOne({ where: { email: email } });

    if (!user)
      return response.status(400).json({ error: { email: "User not found" } });

    //check password
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      errors.password = "Password is incorrect";
      return response.status(400).json({ error: errors });
    }

    //Generate JWT access token
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: 2 * 60 * 60,
    });
    return response.json({ token });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/* GET PERSONALIZED BOOKS OF USER */
exports.getAllUserPersonalizedBooks = async (request, response) => {
  try {
    //Find user from database
    const user = await User.findByPk(request.user.email);

    if (user.age > 18) {
      const books = await Book.findAll({
        where: {
          isAvailable: 1,
        },
      });
      return response.status(200).json({ books });
    } else if (user.age < 18) {
      const books = await Book.findAll({
        where: {
          is18: 0,
          isAvailable: 1,
        },
      });
      return response.status(200).json({ books });
    }
    console.log({ books });
  } catch (error) {
    return response.status(500).json({ error });
    console.log(error);
  }
};

/* GET PERSONALIZED MOVIES  OF USER */
exports.getAllUserPersonalizedMovies = async (request, response) => {
  try {
    //Find user from database
    const user = await User.findByPk(request.user.email);

    if (user.age > 18) {
      const movies = await Movie.findAll({
        where: {
          isAvailable: 1,
        },
      });
      return response.status(200).json({ movies });
    } else if (user.age < 18) {
      const movies = await Movie.findAll({
        where: {
          is18: 0,
          isAvailable: 1,
        },
      });
      return response.status(200).json({ movies });
    }
  } catch (error) {
    return response.status(500).json({ error });
    console.log(error);
  }
};

exports.addCommentBook = async (request, response) => {
  // try{
  //   //Find user from database
  //   const user = await User.findByPk(request.user.email);
  //   const content = request.body.content;
  //   const bookISBN = request.body.bookISBN;
  //   const data = {
  //     userID: user.email,
  //     content,
  //     reponseTo: "null",
  //     bookISBN,
  //   }
  //   const comment = await Comment.create(data)
  // }catch(error){
  // }
};

/* GET DATA OF LOGGED IN USER */
exports.getLoggedUser = async (request, response) => {
  try {
    //Find user from database
    const user = await User.findByPk(request.user.email);

    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ error });
    console.log(error);
  }
};
