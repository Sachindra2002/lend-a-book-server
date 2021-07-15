"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      isBanned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      userRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
