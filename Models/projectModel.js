const { DataTypes } = require('sequelize');
const sequelize = require('../DB/connection');

// Create Project model
const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  project_status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
    allowNull: false,
    defaultValue: 'Pending'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  }
}, {
  tableName: 'projects',
  timestamps: false,
});

module.exports = Project;
