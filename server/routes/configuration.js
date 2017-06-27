var GenericRepository = require('../services/generic-repository');
const collectionName = 'Configuration'

function Configuration() {
    var schema = {
        playerid: String,
        level: String,
        minprice: String,
        maxprice: String,
        league: String,
        teamid: String,
        position: String,
        isRare: Boolean,
        zone: String,
        buynowprice: String,
        enabled: Boolean,
        nationid: String
    };

    GenericRepository.apply(this, [schema, collectionName]);

    this.saveConfiguration = function(data, callback){
    }
}

var conf = new Configuration();

conf.add = function(data, callback){
    var self = this;
    if(db._hasOpened){
        self.saveConfiguration(data, callback);
    }
    else{
        db.once('open', function() {
            self.saveConfiguration(data, callback);
        });
    }
}

module.exports = conf;
