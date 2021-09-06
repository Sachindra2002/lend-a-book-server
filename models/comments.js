"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Book, User }) {
      // define association here
      this.belongsTo(Book, { foreignKey: "isbn" });
      this.belongsTo(User, { foreignKey: "email" });
    }
  }
  Comment.init(
    {
      userID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookISBN: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      responseTo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
    }
  );
  return Comment;
};
