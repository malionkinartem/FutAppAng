var BaseRepository = require('./base-repository');

function UserRepository() {
    var collectionName = "users";
    var schema = {
        firstname: String,
        lastname: String,
        username: String,
        password: String,
        agents: String
    }

    BaseRepository.apply(this, [schema, collectionName]);
}

var repo = new UserRepository();

module.exports = repo;