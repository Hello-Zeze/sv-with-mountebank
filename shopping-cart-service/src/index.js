const CouchbaseClient = require('./couchClient');
const DataAccess = require('./dataAccess');
const Service = require('./service');
const HttpApi = require('./httpApi');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const env = require('./env');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

if(env.canRun()){
    const couchConfig = {
        couchbaseHost:process.env.COUCHBASE_HOST,
        couchbaseClusterUsername:process.env.COUCHBASE_CLUSTER_USERNAME,
        couchbaseClusterPwd:process.env.COUCHBASE_CLUSTER_PASSWORD,
        couchbaseBucketLabel:process.env.COUCHBASE_SHOPPINGCART_BUCKET,
        couchIndexData:{
            fields:['id','productId','orderId']
        }
    };
    const couchClient = new CouchbaseClient(couchConfig);
    const dataAccess = new DataAccess(couchClient);
    const service = new Service(dataAccess);
    const httpApi = new HttpApi(service);

    httpApi.configure(app);

    app.get('/ping', (req,res)=>{
        res.status(200).send('pong');
    });

    const PORT = 3000;

    http.listen(PORT, ()=>{
        console.log('listening on: %s', PORT);
    });
} else {
    console.log('Check your ENV vars');
}
