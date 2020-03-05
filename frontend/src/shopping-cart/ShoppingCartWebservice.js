import Http from '../common/httpapi';
import ApiDirectory from '../common/apiindex/ApiDirectory';

class ShoppingCartWebservice {
    constructor(){
        this._webservice = Http;
        this.shoppingCartSvc = ApiDirectory.getApiEndpoint('shoppingCartSvc');
    }

    loadShoppingCartData(){
        const payload = {
            url:`${this.shoppingCartSvc}`,
            method: 'GET'
        };
        return this._webservice.execute(payload);
    }

    addToShoppingCart(data){
        const payload = {
            url:`${this.shoppingCartSvc}`,
            method: 'POST',
            content: data
        };
        return this._webservice.execute(payload);
    }

    deleteShoppingCartItem(itemId){
        const payload = {
            url:`${this.shoppingCartSvc}/${itemId}`,
            method: 'DELETE'
        };
        return this._webservice.execute(payload);
    }
}

export default new ShoppingCartWebservice();