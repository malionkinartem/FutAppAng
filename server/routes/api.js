const express = require('express');
const router = express.Router();
const conf = require('../repositories/configuration-repository');
var confData = require('../repositories/data-lists-repository')
var dataProcessor = require('../services/data-lists-processor')
var dataListsRoute = require('./data-lists')

router.get('/datalists/type/:type', dataListsRoute.get)

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

router.get('/configurationdata', (req, res) => {
  confData.get(/*{ type: /countries/ }*/)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

router.get('/configurationdata/save', (req, res) => {
  confData.add({id:2, value:'Afganistan', type:'countries'})
    .then(data => {
      res.status(200);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

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
