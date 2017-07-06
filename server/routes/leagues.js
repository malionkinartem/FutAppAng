var leaguesRepository = require('../repositories/leagues-repository')

module.exports.get = function(req, res){
    leaguesRepository.get(req.params)
        .then(configs => {
            res.status(200).json(configs);
        })
        .catch(error => {
            res.status(500).send(error)
    });
}