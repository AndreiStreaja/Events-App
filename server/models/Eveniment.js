// models/Eveniment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Eveniment = sequelize.define('Eveniment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nume_eveniment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_eveniment: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  locatie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Eveniment;
