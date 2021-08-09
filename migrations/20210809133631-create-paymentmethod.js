'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('paymentmethods', {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      creditcardnumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creditcardexpdate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creditcardcvv: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('paymentmethods');
  }
};