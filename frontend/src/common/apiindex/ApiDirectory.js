import _ from 'lodash';

class ApiDirectory {
    constructor(){
        this.ENV = undefined;
        this.directory = {
            baseUrl: undefined,
            ordersSvc: undefined,
            productsSvc: undefined,
            recommendationsSvc: undefined,
            shoppingCartSvc: undefined
        };
        
        const getBaseUrl = (localRef) => {
            return localRef;
        };

        const getServiceConfig = (localRef) => {
            return `${this.directory.baseUrl}${localRef}`;
        };
        this.ENV = process.env.REACT_APP_ENV;
        this.directory.baseUrl = getBaseUrl(process.env.REACT_APP_LOCAL_BASE_URL);
        this.directory.ordersSvc = getServiceConfig(process.env.REACT_APP_ORDERS_SERVICE);
        this.directory.productsSvc = getServiceConfig(process.env.REACT_APP_PRODUCTS_SERVICE);
        this.directory.recommendationsSvc = getServiceConfig(process.env.REACT_APP_RECOMMENDATIONS_SERVICE);
        this.directory.shoppingCartSvc = getServiceConfig(process.env.REACT_APP_SHOPPING_CART_SERVICE);
    }

    getApiEndpoint(name){
        return this.directory[name];
    }

    getResourceUrl(resourceRelativePath){
        return `${this.directory.baseUrl}${resourceRelativePath}`;
    }
}

export default new ApiDirectory();