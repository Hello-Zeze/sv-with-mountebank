class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/shopping-cart/:id', (req,res)=>{self.handleGetAll(self.service, req, res);});
        app.post('/shopping-cart/:id', (req,res)=>{self.handleCreateOrder(self.service, req, res);});
    }

    handleGetItems(svc,req,res){
        const cartId = req.params.id;
        svc.getItems(cartId).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving shopping cart. ${err}`);
        });
    }

    handleAddItem(svc,req,res){
        const cartId = req.params.id;
        const item = req.body;
        svc.addItem(cartId, item).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured item to shopping cart. ${err}`);
        });
    }
}

module.exports = HttpApi;