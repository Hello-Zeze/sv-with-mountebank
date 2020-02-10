const uuid = require('uuid/v4');
class Service {
    constructor(dataAccess){
        this.dataAccess = dataAccess;
    }

    getAllOrders(){
        return this.dataAccess.getAll();
    }

    getOrderById(orderId){
        return this.dataAccess.getById(orderId);
    }

    createOrder(order){
        order.id = uuid();
        return this.dataAccess.add(order);
    }
}

module.exports = Service;