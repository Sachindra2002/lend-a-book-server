"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie_Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie_Reservation.init(
    {
      reservationId: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
      movieId: {
        type: DataTypes.INTEGER,
        required: [true, "Must not be empty"],
      },
    },
    {
      sequelize,
      modelName: "Movie_Reservation",
      tableName: "Movie_Reservation"
    }
  );
  return Movie_Reservation;
};
