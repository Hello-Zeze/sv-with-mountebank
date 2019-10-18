class Service {
    constructor(httpClient){
        this.httpClient = httpClient;
    }

    sendMessage(messageData){
        const httpPayload = {};
        this.httpClient.execute(httpPayload);
    }
}

module.exports = Service;