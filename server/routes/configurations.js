const repository = require('../repositories/configuration-repository');

module.exports.get = (req, res) => {
    repository.get(req.params)
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

module.exports.delete = (req, res) => {
    repository.delete(req.params)
        .then(data => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).send(error)
        });
}

module.exports.update = (req, res) => {
    let id = req.params._id;
    repository.update(id, req.body)
        .then(data => {
            res.status(200).send();
        })
        .catch(error => {
            res.status(500).send(error)
        });
}