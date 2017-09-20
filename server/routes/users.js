var repository = require('../repositories/users-repository');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var encryption = require('../services/encription')

const privateKey = "FUT_USER_ENCRYPTION_KEY";

module.exports.add = (req, res) => {
    var user = req.body;

    user.password = encryption.encrypt(user.password);
    if (user.agents != undefined) {
        user.agents = encryption.encrypt(JSON.stringify(user.agents));
    }

    repository.add(user)
        .then(user => {
            user.password = undefined;
            if (user.agents !== undefined) {
                user.agents = JSON.parse(encryption.decrypt(user.agents));
            }

            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

module.exports.get = (req, res) => {
    repository.get(req.params)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).send(error)
        });
}

module.exports.login = (req, res) => {
    var query = { username: req.body.username };
    repository.get(query, 1)
        .then(result => {
            if (result && result.length > 0 && req.body.password) {            

                let user = result[0];
                if (encryption.decrypt(user.password) === req.body.password) {
                    let token = jwt.sign({
                        username: req.body.username,
                        password: req.body.password
                    }, 'secret');

                    res.status(200).json({
                        isSuccess: true, user: {
                            username: user.username,
                            authToken: token, firstname: user.firstname, lastname: user.lastname,
                            _id: user._id
                        }
                    });
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