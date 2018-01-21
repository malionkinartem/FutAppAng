let repository = require('../repositories/users-repository');

exports.get = async function (id) {
    try {

        let result = await repository.get(id);
        return { isSuccess: true, data: users };
    
    }
    catch (ex) {
        return { isSuccess: false, message: error };
    }
}