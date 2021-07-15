"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isBanned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userRole: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
