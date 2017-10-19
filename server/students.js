const api = require('express').Router();
const { Student } = require('../db/models');

module.exports = api;

api.get('/', function (req, res, next) {
  Student.findAll()
    .then(students => res.json(students))
    .catch(next);
});

api.get('/:studentId', function (req, res, next) {
  const studentId = req.params.studentId;
  Student.findOne({
    where: {
      id: studentId
    }
  })
  .then(student => res.json(student))
  .catch(next);
});

api.post('/', function (req, res, next) {
  Student.create({name: req.body.name, email: req.body.email, campusId: req.body.campusId})
  .then(student => res.status(201).json(student))
  .catch(function(err){
    console.log(err, req.body);
  });
});
