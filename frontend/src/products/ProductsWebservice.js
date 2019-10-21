import Http from '../common/httpapi';
import ApiDirectory from '../common/apiindex/ApiDirectory';

class ProductsWebservice {
    constructor(){
        this._webservice = Http;
        this.productsSvc = ApiDirectory.getApiEndpoint('productsSvc');
    }

    loadProducts(){
        const payload = {
            url:`${this.productsSvc}/`,
            method: 'GET'
        };
        return this._webservice.execute(payload);
    }    
}

export default new ProductsWebservice();