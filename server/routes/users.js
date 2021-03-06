var repository = require('../repositories/users-repository');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var encryption = require('../services/encription');
var config = require('../config')
let service = require('../services/user.services');

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

            res.status(200).json({ isSuccess: true, data: user });
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

module.exports.get = async (req, res) => {
    let result = await service.get(req.params);
    res.status(resul.isSuccess ? 200 : 500).json(result);
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
                    }, config.jwtSecret);

                    res.status(200).json({
                        isSuccess: true,
                        data: {
                            username: user.username,
                            authToken: token,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            agents: user.agents,
                            _id: user._id
                        }
                    });
                }
                else {
                    res.status(200).json({ isSuccess: false, message: 'User name or password invalid.' });
                }
            }
            else {
                res.status(200).json({ isSuccess: false, message: 'User name or password invalid.' });
            }
        })
        .catch(error => {
            res.status(500).send(error)
        });
}

module.exports.update = (req, res) => {
    repository.update(req.body._id, req.body)
        .then(users => {
            res.status(200).json();
        })
        .catch(error => {
            res.status(500).send(error);
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