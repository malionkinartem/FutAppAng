var dataListsRepository = require('../repositories/data-lists-repository')

module.exports.get = function(req, res){
    dataListsRepository.get(req.params)
        .then(configs => {
            res.status(200).json({data: configs, isSuccess: true});
        })
        .catch(error => {
            res.status(500).send({isSuccess: false, message: error});
    });
}