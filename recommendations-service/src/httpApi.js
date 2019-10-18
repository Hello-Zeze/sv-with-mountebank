class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/recommendation/:id', (req,res)=>{self.handleGetById(self.service, req, res);});
    }

    handleGetRecommendationsForProduct(svc,req,res){
        const productId = req.params.id;
        svc.getRecommendationsForProduct(productId).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving recommendations. ${err}`);
        });
    }
}

module.exports = HttpApi;