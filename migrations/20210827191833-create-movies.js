"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      movieName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imdbScore: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      director: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      movieGenre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is18: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      movieYear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      movieImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      movieFile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAvailableOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      movieSummary: {
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
    await queryInterface.dropTable("movies");
  },
};
