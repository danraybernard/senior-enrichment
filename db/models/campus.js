const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Campus.sync();


module.exports = Campus;
