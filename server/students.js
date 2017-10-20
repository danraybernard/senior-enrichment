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

api.post('/create', function (req, res, next) {
  Student.create({name: req.body.name, email: req.body.email, campusId: req.body.campusId})
  .then(student => res.status(201).json(student))
  .catch(function(err){
    console.log(err, req.body);
  });
});

api.put('/:studentId', function (req, res, next) {
  const studentId = req.params.studentId;
  Student.findOne({
    where: {
      id: studentId
    }
  })
  .then(student => student.update(
    req.body
  ))
  .then(function () {
    res.end();
  })
  .catch(function(err){
    console.log(err, req.body);
  })
})

api.delete('/:studentId', function (req, res, next) {
  console.log('getting called');
  const studentId = req.params.studentId;
  Student.findOne({
    where: {
      id: studentId
    }
  })
  .then(student => (student.destroy()))
  .then(() => {
    res.status(204).end();
  })
  .catch(next);
})
