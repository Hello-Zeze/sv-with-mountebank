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
        const request = this.dataAccess.add(order);
        return new Promise((resolve,reject)=>{
            request.then(result=>{
                resolve(order);
            }).catch(err=>{
                reject(err);
            });
        });
    }

    deleteOrder(orderId){
        return this.dataAccess.removeById(orderId);
    }
}

module.exports = Service;