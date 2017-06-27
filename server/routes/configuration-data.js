var GenericRepository = require('../services/generic-repository');
const collectionName = 'DataLists'

function ConfigurationData() {
  // var repo = new GenericRepository({ id: String }, '123');
  var schema = {
    type: String,
    id: number,
    value: String
  }
  GenericRepository.apply(this, [schema, collectionName]);
}


var confData = new ConfigurationData();

exports.configurationData = confData;
