import Http from '../common/httpapi';
import ApiDirectory from '../common/apiindex/ApiDirectory';

class ShoppingCartWebservice {
    constructor(){
        this._webservice = Http;
        this.shoppingCartSvc = ApiDirectory.getApiEndpoint('shoppingCartSvc');
    }

    loadShoppingCartData(cartId){
        const payload = {
            url:`${this.shoppingCartSvc}/${cartId}`,
            method: 'GET'
        };
        return this._webservice.execute(payload);
    }

    addToShoppingCart(cartId, productId){
        const payload = {
            url:`${this.shoppingCartSvc}/${cartId}/${productId}`,
            method: 'GET'
        };
        return this._webservice.execute(payload);
    }
}

export default new ShoppingCartWebservice();