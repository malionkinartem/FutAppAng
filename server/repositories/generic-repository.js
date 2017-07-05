var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.databaseUrl);

var db = mongoose.connection;
mongoose.set('debug', true)

var Repo = function GenericRepository(modelSchema, collectionName) {

    this.configurationSchema = mongoose.Schema(modelSchema);
    this.model = mongoose.model(collectionName , this.configurationSchema);

    this.get = async function(query){
        var self = this;
        
        if(db._hasOpened){
            return await self.model.find(query);
        }
        else{
            await db.once('open');
            return await self.model.find(query);
        }

        return promise;
    }

    this.add = async function(data){
        var self = this;
        var obj = new self.model(data);

        if(db._hasOpened){            
            await obj.save();
        }
        else {
            await db.once('open');
            await obj.save();
        }
    }
    
    this.deleteAll = async function(){
        var self = this;
        if(db._hasOpened){
            await this.model.deleteMany({});
        }
        else{
            await db.once('open');
            await self.model.deleteMany({}); 
        }
    }

    this.saveMany = async function(list){
        var self = this;
        if(db._hasOpened){
            await this.model.insertMany(list);
        }
        else{
            await db.once('open');
            await self.model.insertMany(list);
        }
    }
}

module.exports = Repo;
