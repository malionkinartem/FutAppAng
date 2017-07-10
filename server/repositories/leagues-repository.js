var BaseRepository = require('./base-repository');

function LeaguesRepository() {
    const collectionName = "leagues";
    var schema = {
        name: String,
        id: Number,
        shortName: String,
        clubs: Array
    }

    BaseRepository.apply(this, [schema, collectionName]);
}

var leagRepo = new LeaguesRepository();
module.exports = leagRepo;