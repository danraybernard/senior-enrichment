const Sequelize = require('sequelize');
const db = require('../db');
const Campus = require('./campus');

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  defaultScope: {
    include: [
      { model: Campus }
    ]
  }
});

Student.sync();

module.exports = Student;
