const { request, response } = require("express");
const { sequelize, User } = require("../models");

/*Get all user pending for verification */
exports.getUsers = async (request, response) => {
  try {
    const users = await User.findAll();

    return response.status(200).json({ users });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/* Verify new user (change isVerified property) */
exports.verifyUser = async (request, response) => {
  try {
    const id = request.params.id;
    let user = await User.findOne({ where: { email: id } });

    user.isVerified = !user.isVerified;

    user.save();

    //send success email

    return response.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

/* Reject new user (change isVerified property) */
exports.rejectUser = async (request, response) => {
  try {
    const id = request.params.id;
    let user = await User.findOne({ where: { email: id } });

    user.isVerified = !user.isVerified;

    user.save();

    //send reject email along with transaction reversal

    return response.status(200).json({ message: "User rejected successfully" });
  } catch (error) {
    return response.status(500).json({ error });
  }
};

exports.getUser = async (request, response) => {
  const id = request.params.id;

  try {
    let user = await User.findByPk(id);
    if (!user)
      return response
        .status(404)
        .json({ error: { message: "User not found" } });

    //If user calling the request is not admin and if the data is not the user's data
    if (
      JSON.stringify(user.email) !== JSON.stringify(request.user.email) &&
      request.user.userRole !== "admin"
    )
      return response.status(403).json({ error: "Unauthorized" });

    return response.status(200).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error });
  }
};
