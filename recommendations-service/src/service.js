class Service {
    constructor(dataAccess){
        this.dataAccess = dataAccess;
    }

    getRecommendationsForProduct(productId){
        return this.dataAccess.getById(productId);
    }
}

module.exports = Service;