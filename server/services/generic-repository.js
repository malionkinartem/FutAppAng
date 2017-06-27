var mongoose = require('mongoose');
mongoose.connect('mongodb://malonkinartem:Cool1989@ds033607.mlab.com:33607/fut-app');

var db = mongoose.connection;

var Repo = function GenericRepository(modelSchema, collectionName) {

    this.configurationSchema = mongoose.Schema(modelSchema);
    this.model = mongoose.model(collectionName, this.configurationSchema);

    this.find = function(query){
        var self = this;
        var promise = new Promise((resolve, reject) => {

            self.model.find(query, function (err, items) {
               return resolve(items);
            })

        });

        return promise;
    }

    this.get = function(query){
        var self = this;
        var promise = new Promise((resolve, reject)=>{
            if(db._hasOpened){
                self.find(undefined)
                    .then(result => resolve(result));
            }
            else{
                db.once('open', function() {
                    self.find(undefined)
                        .then(result => resolve(result));
                });
            }
        });

        return promise;
    }
}




module.exports = Repo;
