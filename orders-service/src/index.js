const DataAccess = require('./dataAccess');
const Service = require('./service');
const HttpApi = require('./httpApi');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

const dataAccess = new DataAccess();
const service = new Service(dataAccess);
const httpApi = new HttpApi(service);

httpApi.configure(app);

const PORT = 3000;

http.listen(PORT, ()=>{
    console.log('listening on: %s', PORT);
});