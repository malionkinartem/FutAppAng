const repository = require('../repositories/players-repository');

module.exports.get = (req, res) => {
    repository.get(req.params, 15)
        .then(configs => {
            res.status(200).json(configs);
        })
        .catch(error => {
            res.status(500).send(error)
        });
}

module.exports.getByName = (req, res) => {
    repository.getFilteredByName(req.params.filter, 15)
        .then(configs => {
            res.status(200).json(configs);
        })
        .catch(error => {
            res.status(500).send(error)
        });
}