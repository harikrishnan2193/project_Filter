const { DataTypes } = require('sequelize');
const sequelize = require('../DB/connection');

//Create model Users
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users', 
  timestamps: false, 
});

module.exports = User;
