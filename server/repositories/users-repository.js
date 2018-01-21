var mongoose = require('mongoose');

var BaseRepository = require('./base-repository');

var agentsSchema = new mongoose.Schema({ agentname: String, password: String, platform: String });

function UserRepository() {
    var collectionName = "users";
    var schema = {
        firstname: String,
        lastname: String,
        username: String,
        password: String,
        agents: [agentsSchema]
    }

    BaseRepository.apply(this, [schema, collectionName]);
}

var repo = new UserRepository();

module.exports = repo;