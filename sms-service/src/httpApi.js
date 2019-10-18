class HttpApi {
    constructor(service){
        this.service = service;
    }

    configure(app){
        const self = this;        
        app.post('/sms/:id', (req,res)=>{self.handleSendMessage(self.service, req, res);});
    }

    handleSendMessage(svc,req,res){
        const messageData = req.body;
        svc.sendMessage(messageData).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            res.status(500).send(`An error occured sending sms message. ${err}`);
        });
    }
}

module.exports = HttpApi;