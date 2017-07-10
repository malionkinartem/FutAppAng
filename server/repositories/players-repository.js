var BaseRepository = require('./base-repository');

function PlayerRepository() {
    var collectionName = "players";
    var schema = {
        firstName: String,
        lastName: String,
        fullName: String,
        baseId: Number,
        id: Number
    }

    BaseRepository.apply(this, [schema, collectionName]);
}

var repo = new PlayerRepository();

module.exports = repo;