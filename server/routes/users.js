var repository = require('../repositories/users-repository');
var crypto = require('crypto');

module.exports.get = (req, res) => {
    repository.get(req.params)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).send(error)
        });



    // repository.add(req.body)
    //     .then(users => {
    //         res.status(200).json(users);
    //     })
    //     .catch(error => {
    //         res.status(500).send(error)
    //     });

    // repository.put(req.body)
    //     .then(users => {
    //         res.status(200).json(users);
    //     })
    //     .catch(error => {
    //         res.status(500).send(error)
    //     });

}

module.exports.login = (req, res) => {
    var query = { username: req.body.username };
    repository.get(query, 1)
        .then(result => {
            if (result && result.length > 0 && req.body.password) {
                var hashPassword = crypto.createHash('md5').update(req.body.password).digest('hex');
                if (hashPassword === result[0].password) {
                    res.status(200).json({ isSuccess: true, user: result[0] });
                }
                else {
                    res.status(200).json({ isSuccess: false });
                }
            }
            else {
                res.status(200).json({ isSuccess: false });
            }
        })
        .catch(error => {
            res.status(500).send(error)
        });
}