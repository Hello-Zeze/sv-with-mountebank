const uuid = require('uuidv4');
class DataAccess {
    constructor(){

    }

    add(item){
        return new Promise((resolve,reject)=>{
            item.id = uuid();
            resolve(item);
        });
    }

    getById(id){
        return new Promise((resolve,reject)=>{
            resolve({id,title:'Chef Cleaver'});
        });
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            resolve([{},{},{},{}]);
        });
    }
}

module.exports = DataAccess;