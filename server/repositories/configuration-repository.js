var GenericRepository = require('./generic-repository');

function Configuration() {
    const collectionName = 'configurations';
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