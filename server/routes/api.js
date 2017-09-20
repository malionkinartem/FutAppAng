const express = require('express');
const router = express.Router();

const conf = require('../repositories/configuration-repository');
var dataProcessor = require('../services/data-lists-processor')

var dataListsRoute = require('./data-lists')
var leaguesRoute = require('./leagues')
var configurationsRoute = require('./configurations')
var playersRoute = require('./players')
var usersRoute = require('./users')
var transferingRoute = require('./transferring')

/* Home Api */
router.get('/', (req, res) => {
  res.send('api works');
});

// Data lists
router.get('/datalists/type/:type', dataListsRoute.get)

// Leagues
router.get('/leagues', leaguesRoute.get);

// Configurations
router.get('/configurations', configurationsRoute.get);
router.post('/configurations', configurationsRoute.save);
router.delete('/configurations/:_id', configurationsRoute.delete);
router.get('/configurations/:_id', configurationsRoute.get);
router.put('/configurations/:_id', configurationsRoute.update)

// Players
router.get('/players', playersRoute.get);
router.get('/players/:id', playersRoute.get);
router.get('/players/name/:filter', playersRoute.getByName);

// Users
router.get('/users', usersRoute.get);
router.get('/users/:_id', usersRoute.get);
router.post('/users/login', usersRoute.login);
router.post('/users', usersRoute.add);
// router.post('/users', usersRoute.add);

router.get('/configurationdata/process', (req, res) => {
  dataProcessor.update()
    .then(data => {
      res.status(200);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

// start transfering
router.post('/transferring/start', transferingRoute.start);

module.exports = router;
