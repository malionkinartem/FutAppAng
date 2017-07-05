var GenericRepository = require('./generic-repository');
const collectionName = 'datalists'

function ConfigurationData() {
  
  var schema = {
    type: String,
    id: Number,
    value: String,
    shortValue: String
  }
  
  GenericRepository.apply(this, [schema, collectionName]);
}

var confData = new ConfigurationData();
module.exports = confData;
