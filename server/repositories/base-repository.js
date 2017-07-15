var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.databaseUrl);

var db = mongoose.connection;
mongoose.set('debug', true)

var Repo = function BaseRepository(modelSchema, collectionName) {

    this.configurationSchema = mongoose.Schema(modelSchema);
    this.model = mongoose.model(collectionName, this.configurationSchema);

    this.get = async function (query, limit) {
        if (!db._hasOpened) {
            await db.once('open');
        }

        if (limit) {
            return await this.model.find(query).limit(limit);
        }

        return await this.model.find(query);
    }

    this.add = async function (data) {
        var self = this;
        var obj = new self.model(data);

        if (db._hasOpened) {
            await obj.save();
        }
        else {
            await db.once('open');
            await obj.save();
        }
    }

    this.deleteAll = async function () {
        var self = this;
        if (db._hasOpened) {
            await this.model.deleteMany({});
        }
        else {
            await db.once('open');
            await self.model.deleteMany({});
        }
    }

    this.saveMany = async function (list) {
        var self = this;
        if (db._hasOpened) {
            await this.model.insertMany(list);
        }
        else {
            await db.once('open');
            await self.model.insertMany(list);
        }
    }

    this.delete = async function (query) {
        await this.baseAction();

        return await this.model.remove(query);
    }

    this.update = async function (id, model) {
        await this.baseAction();

        return await this.model.update({ "_id": id }, model);
    }

    this.baseAction = async function () {
        if (!db._hasOpened) {
            await db.once('open');
        }
    }
}

module.exports = Repo;
