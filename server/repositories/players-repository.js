var BaseRepository = require('./base-repository');

function PlayerRepository() {
    var collectionName = "players";
    var schema = {
        firstName: String,
        lastName: String,
        fullName: String,
        baseId: Number,
        id: Number,
        rating: Number
    }

    BaseRepository.apply(this, [schema, collectionName]);

    this.getFilteredByName = async function (filter) {
        await this.baseAction();
        return await this.model.find({ "fullName": new RegExp(filter, "i") });
    }
}

var repo = new PlayerRepository();

module.exports = repo;