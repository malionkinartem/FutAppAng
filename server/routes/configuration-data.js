var GenericRepository = require('../services/generic-repository');
const collectionName = 'datalists'

function ConfigurationData() {
  // var repo = new GenericRepository({ id: String }, '123');
  var schema = {
    type: String,
    id: Number,
    value: String
  }
  GenericRepository.apply(this, [schema, collectionName]);
}


var confData = new ConfigurationData();

module.exports = confData;
