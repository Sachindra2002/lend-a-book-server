//const User = require("../models/users");
const { sequelize, User } = require("../models");


//validate registrations
exports.validateRegister = async (data) => {
  let errors = {};

  try {
    let user = await User.findOne({ where: { email: data.email } });
    if (user) errors.email = "Email already exists";

    // if(data.password.length < 8)
    //   errors.password = "Password should be 8 or more characters"

    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords don't match";
      
    return errors;
  } catch (error) {
    return error;
  }
};
