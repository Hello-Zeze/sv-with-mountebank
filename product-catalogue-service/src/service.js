const uuid = require('uuid/v4');
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

    createProduct(product){
        product.id = uuid();
        return this.dataAccess.add(product);
    }
}

module.exports = Service;