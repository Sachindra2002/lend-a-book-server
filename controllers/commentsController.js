const { request, response } = require("express");
const { sequelize, User, Book, Movie, Comment } = require("../models");

/* Get commnents for a bok */
exports.getAllBookComments = async (request, response) => {
  try {
    const isbn = request.params.id;
    const comments = await Comment.findAll({
      where: {
        isbn: isbn,
      },
      include: [User],
    });
    return response.status(200).json({ comments });
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
