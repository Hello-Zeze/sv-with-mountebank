class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/product', (req,res)=>{self.handleGetAll(self.service, req, res);});
        app.get('/product/:id', (req,res)=>{self.handleGetById(self.service, req, res);});
        app.post('/product', (req,res)=>{self.handleCreateProducts(self.service, req, res);});
    }

    handleGetAll(svc,req,res){
        svc.getAllProducts().then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving products. ${err}`);
        });
    }

    handleGetById(svc,req,res){
        const productId = req.params.id;
        svc.getProductById(productId).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving product. ${err}`);
        });
    }

    handleCreateProducts(svc,req,res){
        const products = req.body.products;
        let productCollection = [];
        products.forEach(product=>{
            productCollection.push(svc.createProduct(product));
        });
        Promise.all(productCollection).then(results=>{
            res.status(200).send(`Successfully seeded ${results.length} products.`);
        }).catch(err=>{
            res.status(500).send(`An error occured seeding products. ${err}`);
        });
    }
}

module.exports = HttpApi;