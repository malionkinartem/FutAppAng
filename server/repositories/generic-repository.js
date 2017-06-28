var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.databaseUrl);

var db = mongoose.connection;
mongoose.set('debug', true)

var Repo = function GenericRepository(modelSchema, collectionName) {

    this.configurationSchema = mongoose.Schema(modelSchema);
    this.model = mongoose.model(collectionName , this.configurationSchema);

    this.find = function(query){
        var self = this;
        var promise = new Promise((resolve, reject) => {

            self.model.find(query, function (err, items) {
                if(!!err){
                    reject(err);
                }
                else{
                    resolve(items);
                }
            })
        });

        return promise;
    }

    this.get = function(query){
        var self = this;
        
        if(db._hasOpened){
            return self.find(undefined);
        }
        else{
            db.once('open', function() {
                return self.find(undefined);
            });
        }

        return promise;
    }


    this.saveConfiguration = function(data){
        var self = this;

        var promise = new Promise((resolve, reject) => {
            var obj = new self.model(data);
                
                obj.save(function(err, result){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(result);
                    }
                });
        });

        return promise;
    }

    this.add = function(data){
        var self = this;
        if(db._hasOpened){
            return this.saveConfiguration(data);
        }
        else{
            db.once('open', function() {
                return self.saveConfiguration(data);
            });
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
