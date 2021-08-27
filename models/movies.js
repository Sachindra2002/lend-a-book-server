"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init(
    {
      movieName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imdbScore: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieGenre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is18: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      movieYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movieFile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAvailableOnline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      movieSummary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Movie",
      modelName: "movies",
    }
  );
  return Movie;
};
