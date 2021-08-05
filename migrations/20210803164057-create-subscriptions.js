'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscriptions', {
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      membershipOption: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subscriptionStartDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subscriptionEndDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalAmountPaid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balanceLeft: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subscriptions');
  }
};