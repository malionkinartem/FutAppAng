const express = require('express');
const router = express.Router();


const conf = require('../repositories/configuration-repository');
var dataProcessor = require('../services/data-lists-processor')

var dataListsRoute = require('./data-lists')
var leaguesRoute = require('./leagues')

router.get('/datalists/type/:type', dataListsRoute.get)

router.get('/leagues', leaguesRoute.get);

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

//Get all configurations
router.get('/configurations', (req, res) => {
  conf.get()
    .then(configs => {
      res.status(200).json(configs);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});

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
