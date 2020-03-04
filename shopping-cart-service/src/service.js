const uuid = require('uuid/v4');
class Service {
    constructor(dataAccess){
        this.dataAccess = dataAccess;
    }

    getItems(){
        return this.dataAccess.getAll();
    }

    addItem(item){
        item.id = uuid();
        const request = this.dataAccess.add(item);
        return new Promise((resolve,reject)=>{
            request.then(result=>{
                resolve(item);
            }).catch(err=>{
                reject(err);
            });
        });
    }

    deleteItem(itemId){
        return this.dataAccess.removeById(itemId);
    }
}

module.exports = Service;