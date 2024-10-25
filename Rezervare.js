const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Eveniment_rezervat:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  Data_rezervarii: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  Ora_rezervarii: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Utilizator: {  // Noua coloană
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Reservation;
