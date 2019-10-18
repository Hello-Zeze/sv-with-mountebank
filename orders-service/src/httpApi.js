class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/order', (req,res)=>{self.handleGetAll(self.service, req, res);});
        app.get('/order/:id', (req,res)=>{self.handleGetById(self.service, req, res);});
        app.post('/order', (req,res)=>{self.handleCreateOrder(self.service, req, res);});
    }

    handleGetAll(svc,req,res){
        svc.getAllOrders().then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving orders. ${err}`);
        });
    }

    handleGetById(svc,req,res){
        const orderId = req.params.id;
        svc.getOrderById(orderId).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving order. ${err}`);
        });
    }

    handleCreateOrder(svc,req,res){
        const order = req.body;
        svc.createOrder(order).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured creating order. ${err}`);
        });
    }
}

module.exports = HttpApi;