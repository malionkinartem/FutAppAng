const repository = require('../repositories/players-repository');

module.exports.get = (req, res) => {
    repository.get()
        .then(configs => {
            res.status(200).json(configs);
        })
        .catch(error => {
            res.status(500).send(error)
        });
}