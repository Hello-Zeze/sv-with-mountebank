const CouchbaseClient = require('./couchClient');
const DataAccess = require('./dataAccess');
const Service = require('./service');
const HttpApi = require('./httpApi');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const env = require('./env');
const cors = require('cors');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

if(env.canRun()){
    const couchConfig = {
        couchbaseHost:process.env.COUCHBASE_HOST,
        couchbaseClusterUsername:process.env.COUCHBASE_CLUSTER_USERNAME,
        couchbaseClusterPwd:process.env.COUCHBASE_CLUSTER_PASSWORD,
        couchbaseBucketLabel:process.env.COUCHBASE_RECOMMENDATIONS_BUCKET,
        couchIndexData:{
            fields:['id','productId','relatedProducts']
        }
    };
    const couchClient = new CouchbaseClient(couchConfig);
    const dataAccess = new DataAccess(couchClient);
    const service = new Service(dataAccess);
    const httpApi = new HttpApi(service);

    app.use(cors({
        origin: '*',
        optionsSuccessStatus: 200
    }));
    app.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGINS);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
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
