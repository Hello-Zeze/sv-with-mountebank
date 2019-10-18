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
        return this.dataAccess.add(order);
    }
}

module.exports = Service;