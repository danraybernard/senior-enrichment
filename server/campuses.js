const api = require('express').Router();
const { Campus } = require('../db/models');

module.exports = api;

api.get('/', function (req, res, next) {
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next);
});

api.get('/:campusId', function (req, res, next) {
  const campusId = req.params.campusId;
  Campus.findOne({
    where: {
      id: campusId
    }
  })
  .then(campus => res.json(campus))
  .catch(next);
});

api.post('/create', function (req, res, next) {
  Campus.create(req.body)
  .then(campus => res.status(201).json(campus))
  .catch(function(err){
    console.log(err, req.body);
  });
});

api.put('/:campusId', function (req, res, next) {
  const campusId = req.params.campusId;
  Campus.findOne({
    where: {
      id: campusId
    }
  })
  .then(campus => campus.update(
    req.body
  ))
  .then(function () {
    res.end();
  })
  .catch(function(err){
    console.log(err, req.body);
  })
})

api.delete('/:campusId', function (req, res, next) {
  const campusId = req.params.campusId;
  Campus.findOne({
    where: {
      id: campusId
    }
  })
  .then(campus => campus.destroy())
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
})
