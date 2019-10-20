import Http from '../common/httpapi';
import ApiDirectory from '../common/apiindex/ApiDirectory';

class OrdersWebservice {
    constructor(){
        this._webservice = Http;
        this.ordersSvc = ApiDirectory.getApiEndpoint('ordersSvc');
    }

    loadOrders(){
        const payload = {
            url:`${this.ordersSvc}/`,
            method: 'GET'
        };
        return this._webservice.execute(payload);
    }

    createOrder(data){
        const payload = {
            url:`${this.ordersSvc}/`,
            method: 'POST',
            content: data
        };
        return this._webservice.execute(payload);
    }
}

export default new OrdersWebservice();

