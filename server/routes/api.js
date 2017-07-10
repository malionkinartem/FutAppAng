const express = require('express');
const router = express.Router();

const conf = require('../repositories/configuration-repository');
var dataProcessor = require('../services/data-lists-processor')

var dataListsRoute = require('./data-lists')
var leaguesRoute = require('./leagues')
var configurationsRoute = require('./configurations')
var playersRoute = require('./players')

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

// Players
router.get('/players', playersRoute.get);

router.get('/configurationdata/process', (req, res) => {
  dataProcessor.update()
    .then(data => {
      res.status(200);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

module.exports = router;
