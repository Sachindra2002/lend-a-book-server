"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "email" });
    }
  }
  Subscription.init(
    {
      email: {
        type: DataTypes.STRING,
        foreignKey: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },

      membershipOption: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      subscriptionStartDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      subscriptionEndDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      totalAmountPaid: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      balanceLeft: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "subscriptions",
      modelName: "Subscription",
    }
  );
  return Subscription;
};
