class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/order/:clientId', (req,res)=>{self.handleGetAll(self.service, req, res);});
        app.post('/order/:clientId', (req,res)=>{self.handleCreateOrder(self.service, req, res);});
    }

    handleGetAll(svc,req,res){
        const clientId = req.params.clientId;
        svc.getAllOrders(clientId).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving orders. ${err}`);
        });
    }

    handleCreateOrder(svc,req,res){
        const clientId = req.params.clientId;
        const order = req.body;
        svc.createOrder(clientId, order).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured creating order. ${err}`);
        });
    }
}

module.exports = HttpApi;