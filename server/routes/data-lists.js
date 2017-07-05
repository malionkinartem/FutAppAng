var dataListsRepository = require('../repositories/data-lists-repository')

module.exports.get = async function(req, res){
    dataListsRepository.get(req.params)
        .then(configs => {
            res.status(200).json(configs);
        })
        .catch(error => {
            res.status(500).send(error)
    });
}