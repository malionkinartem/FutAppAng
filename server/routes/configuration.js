var GenericRepository = require('../services/generic-repository');
const collectionName = 'configurations'

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
}

var conf = new Configuration();



module.exports = conf;
