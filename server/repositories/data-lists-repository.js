var BaseRepository = require('./base-repository');

function ConfigurationData() {
    const collectionName = 'datalists';
    var schema = {
      type: String,
      id: Number,
      value: String,
      shortValue: String
    }
    
    BaseRepository.apply(this, [schema, collectionName]);
}

var confData = new ConfigurationData();
module.exports = confData;
