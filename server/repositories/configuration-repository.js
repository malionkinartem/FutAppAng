var BaseRepository = require('./base-repository');

function Configuration() {
    const collectionName = 'configurations';
    var idValueType = { id: Number, value: String };
    var schema = {
        player: idValueType,
        level: String,
        minprice: String,
        maxprice: String,
        league: idValueType,
        team: idValueType,
        position: String,
        isRare: Boolean,
        zone: String,
        buynowprice: String,
        enabled: Boolean,
        nation: idValueType,
        id: String
    };

    BaseRepository.apply(this, [schema, collectionName]);
}

var conf = new Configuration();

module.exports = conf;
