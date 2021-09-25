"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Book, CommentResponses, CommentLikes }) {
      // define association here
      this.belongsTo(User, { foreignKey: "email" });
      this.belongsTo(Book, { foreignKey: "isbn" });
      this.hasMany(CommentResponses, { foreignKey: "id" });
      this.hasMany(CommentLikes, { foreignKey: "id" });
    }
  }
  Comment.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isbn: {
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
