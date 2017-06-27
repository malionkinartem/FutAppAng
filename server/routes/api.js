const express = require('express');
const router = express.Router();
const conf = require('./configuration');
var confData = require('./configuration-data')

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
  confData.find({ type: 'countries'})
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

module.exports = router;
