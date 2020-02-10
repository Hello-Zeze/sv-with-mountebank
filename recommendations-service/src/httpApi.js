class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;
        app.get('/recommendation/:productId', (req,res)=>{self.handleGetRecommendationsForProduct(self.service, req, res);});
        app.post('/recommendation', (req,res)=>{self.handleSeedRecommendations(self.service, req, res);});
        app.get('/recommendation', (req,res)=>{self.handleGetAllRecommendations(self.service, req, res);});
    }

    handleGetRecommendationsForProduct(svc,req,res){
        const productId = req.params.productId;
        svc.getRecommendationsForProduct(productId).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving recommendations. ${err}`);
        });
    }

    handleSeedRecommendations(svc,req,res){
        const recommendations = req.body.recommendations;
        let recommendationCollection = [];
        recommendations.forEach(recommendation=>{
            recommendationCollection.push(svc.createRecommendation(recommendation));
        });
        Promise.all(recommendationCollection).then(results=>{
            res.status(200).send(`Successfully seeded ${results.length} recommendations.`);
        }).catch(err=>{
            res.status(500).send(`An error occured seeding recommendations. ${err}`);
        });
    }

    handleGetAllRecommendations(svc,req,res){
        svc.getAll().then(results=>{
            res.status(200).send(results);
        }).catch(err=>{
            res.status(500).send(`An error occured retrieving recommendations. ${err}`);
        });
    }
}

module.exports = HttpApi;