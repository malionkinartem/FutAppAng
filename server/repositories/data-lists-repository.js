var GenericRepository = require('./generic-repository');

function ConfigurationData() {
    const collectionName = 'datalists';
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
