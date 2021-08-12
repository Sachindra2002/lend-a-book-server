const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.json");

const { sequelize, User } = require("../models");

module.exports = (admin) => async (request, response, next) => {
  let token;
  if (
    //Check if bearer token exists
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  ) {
    //Get bearer token
    token = request.headers.authorization.split("Bearer ")[1];
  } else {
    return response.status(403).json({ error: "Unauthorized1" });
  }

  let auth_token;

  jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
    auth_token = decodedToken;
  });

  //if token is not sucessfully decoded
  if (!auth_token) return response.status(403).json({ error: "Unauthorized2" });

  let user;

  try {
    //Check if user exists
    user = await User.findOne({ where: { email: auth_token.email } });
  } catch (error) {
    return response.status(500).json({ error: "Something went wrong" });
  }

  //if user does not exist send error response
  if (!user) return response.status(403).json({ error: "Unauthroized3" });

  //If using as admin authorization middleware. check if user is admin
  if (admin === "admin") {
    if (user.userRole !== "admin") {
      return response.status(403).json({ error: "Unauthoraized4" });
    }
  }

  request.user = user;

  return next();
};

/* Use of middleware 

    None - Route accessible for all users including unregistered
    auth() - Route accessible for all registered and logged in users
    auth("admin") - Route accessible to all logged in administrators

*/
