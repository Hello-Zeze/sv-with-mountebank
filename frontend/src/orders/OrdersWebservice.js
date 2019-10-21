import Http from '../common/httpapi';
import ApiDirectory from '../common/apiindex/ApiDirectory';

class OrdersWebservice {
    constructor(){
        this._webservice = Http;
        this.ordersSvc = ApiDirectory.getApiEndpoint('ordersSvc');
    }

    loadOrders(clientId){
        const payload = {
            url:`${this.ordersSvc}/${clientId}`,
            method: 'GET'
        };
        return this._webservice.execute(payload);
    }

    createOrder(clientId,data){
        const payload = {
            url:`${this.ordersSvc}/${clientId}`,
            method: 'POST',
            content: data
        };
        return this._webservice.execute(payload);
    }
}

export default new OrdersWebservice();

