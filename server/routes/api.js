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

module.exports = router;
