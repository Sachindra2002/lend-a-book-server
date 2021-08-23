'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {

      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      bookName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookGenre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is18: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      bookTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookYear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bookFile: {
        type: Sequelize.STRING
      },
      isAvailableOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      bookSummary: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};