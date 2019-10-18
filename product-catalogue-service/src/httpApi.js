class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/product', (req,res)=>{self.handleGetAll(self.service, req, res);});
        app.get('/product/:id', (req,res)=>{self.handleGetById(self.service, req, res);});
    }

    handleGetAll(svc,req,res){
        svc.getAllOrders().then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving products. ${err}`);
        });
    }

    handleGetById(svc,req,res){
        const orderId = req.params.id;
        svc.getOrderById(orderId).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving product. ${err}`);
        });
    }
}

module.exports = HttpApi;