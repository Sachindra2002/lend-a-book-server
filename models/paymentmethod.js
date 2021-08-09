'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, { foreignKey: "email" });
    }
  };
  PaymentMethod.init({
    email: {
      type: DataTypes.STRING,
      foreignKey: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    creditcardnumber :{
      type: DataTypes.STRING,
      allowNull: false,
    },

    creditcardexpdate :{
      type: DataTypes.STRING,
      allowNull: false,
    },

    creditcardcvv :{
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'paymentmethods',
  });
  return PaymentMethod;
};