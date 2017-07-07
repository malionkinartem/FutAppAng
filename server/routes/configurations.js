const repository = require('../repositories/configuration-repository');

module.exports.get = (req, res) => {
    repository.get()
        .then(configs => {
            res.status(200).json(configs);
        })
        .catch(error => {
            res.status(500).send(error)
        });
}

module.exports.save = (req, res) => {
    repository.add(req.body)
        .then(configs => {
            res.status(200).json(configs);
        })
        .catch(error => {
            res.status(500).send(error)
        });
}