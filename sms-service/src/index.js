const Service = require('./service');
const HttpApi = require('./httpApi');
const HttpClient = require('./httpClient');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

const httpClient = new HttpClient();
const service = new Service(httpClient);
const httpApi = new HttpApi(service);

httpApi.configure(app);

const PORT = 3232;

http.listen(PORT, ()=>{
    console.log('listening on: %s', PORT);
});