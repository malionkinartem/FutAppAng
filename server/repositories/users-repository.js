var BaseRepository = require('./base-repository');

function UserRepository() {
    var collectionName = "users";
    var schema = {
        firstname: String,
        lastname: String,
        username: String,
        password: String
    }

    BaseRepository.apply(this, [schema, collectionName]);

    this.getByUserName = function(userName){
        this.get
    }
}

var repo = new UserRepository();

module.exports = repo;