class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/order', (req,res)=>{self.handleGetAll(self.service, req, res);});
        app.post('/order', (req,res)=>{self.handleCreateOrder(self.service, req, res);});
        app.get('/order/:orderId', (req,res)=>{self.handleGetOrderById(self.service, req, res);});
    }

    handleGetAll(svc,req,res){        
        svc.getAllOrders().then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving orders. ${err}`);
        });
    }

    handleCreateOrder(svc,req,res){
        let order = req.body;
        order.status = "Order Created";
        svc.createOrder(order).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured creating order. ${err}`);
        });
    }

    handleGetOrderById(svc,req,res){
        const orderId = req.params.orderId;
        svc.getOrderById(orderId).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving order. ${err}`);
        });
    }
}

module.exports = HttpApi;