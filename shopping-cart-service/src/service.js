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
        return this.dataAccess.add(item);
    }
}

module.exports = Service;