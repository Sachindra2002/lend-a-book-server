"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Comment}) {
      // define association here
      this.belongsTo(User, { foreignKey: "email" });
      this.belongsTo(Comment, { foreignKey: "commentId" });
    }
  }
  CommentLikes.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      commentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CommentLikes",
      tableName: "Comment_likes",
    }
  );
  return CommentLikes;
};
