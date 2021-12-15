'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book, User, Book_Reservation}) {
      // define association here
      this.belongsToMany(Book, {through: Book_Reservation});
      this.belongsTo(User, { foreignKey: "email" });
    }
  };
  Reservation.init({
    reservationDate: DataTypes.STRING,
    status: DataTypes.STRING,
    returnDate: DataTypes.STRING,
    charges: DataTypes.STRING,
    overdueCharges: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Reservation',
    tableName: 'Reservations',
  });
  return Reservation;
};