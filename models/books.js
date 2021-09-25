"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment }) {
      // define association here
      this.hasMany(Comment, { foreignKey: "isbn" });
    }
  }
  Book.init(
    {
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      bookName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookGenre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is18: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      bookTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bookFile: {
        type: DataTypes.STRING,
      },
      isAvailableOnline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      bookSummary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
    }
  );
  return Book;
};
