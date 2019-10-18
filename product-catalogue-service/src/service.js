class Service {
    constructor(dataAccess){
        this.dataAccess = dataAccess;
    }

    getAllProducts(){
        return this.dataAccess.getAll();
    }

    getProductById(productId){
        return this.dataAccess.getById(productId);
    }
}

module.exports = Service;