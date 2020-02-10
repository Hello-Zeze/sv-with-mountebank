const uuid = require('uuid/v4');
class Service {
    constructor(dataAccess){
        this.dataAccess = dataAccess;
    }

    getRecommendationsForProduct(productId){
        return this.dataAccess.query(`productId = "${productId}"`);
    }

    createRecommendation(recommendation){
        recommendation.id = uuid();
        return this.dataAccess.add(recommendation);
    }

    getAll(){
        return this.dataAccess.getAll();
    }
}

module.exports = Service;