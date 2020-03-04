class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/shopping-cart', (req,res)=>{self.handleGetItems(self.service, req, res);});
        app.post('/shopping-cart', (req,res)=>{self.handleAddItem(self.service, req, res);});
        app.delete('/shopping-cart/:itemId', (req,res)=>{self.handleRemoveItem(self.service, req, res);});
    }

    handleGetItems(svc,req,res){
        svc.getItems().then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving shopping cart. ${err}`);
        });
    }

    handleAddItem(svc,req,res){
        const item = req.body;
        svc.addItem(item).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured adding item to shopping cart. ${err}`);
        });
    }

    handleRemoveItem(svc,req,res){
        const itemId = req.params.itemId;
        svc.deleteItem(itemId).then(result=>{
            res.status(200).send('OK');
        }).catch(err=>{
            res.status(500).send(`An error occured removing item to shopping cart. ${err}`);
        });
    }
}

module.exports = HttpApi;