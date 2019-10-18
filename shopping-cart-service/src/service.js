class Service {
    constructor(dataAccess){
        this.dataAccess = dataAccess;
    }

    getItems(cartId){
        return this.dataAccess.getAll(cartId);
    }

    addItem(cartId, item){
        return this.dataAccess.add(cartId, item);
    }
}

module.exports = Service;