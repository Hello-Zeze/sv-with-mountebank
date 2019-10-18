const uuid = require('uuidv4');
class DataAccess {
    constructor(){

    }

    getById(id){
        return new Promise((resolve,reject)=>{
            resolve([{},{},{},{}]);
        });
    }
}

module.exports = DataAccess;