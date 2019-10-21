import Dispatcher from '../Dispatcher';
import BaseStore from '../common/stores/BaseStore';
import { ProductsActionTypes } from './ProductsActionTypes';

class ProductsStore extends BaseStore{
    constructor(){
        super();
        this.state = {
            products: []
        };
    }

    handleActions(action){
        switch(action.type){
            case ProductsActionTypes.PRODUCTS_LOAD_SUCCESS:
                this.handleProductsLoadSuccess(action);
                break;
            case ProductsActionTypes.PRODUCTS_LOAD_FAIL:
                this.handleProductsLoadFail(action);
                break;
            default:
                break;
        }
    }

    handleProductsLoadSuccess(action){
        this.state.products = action.payload;
        this.emit(ProductsActionTypes.PRODUCTS_LOAD_SUCCESS, this.state.products);
    }

    handleProductsLoadFail(action){        
        this.emit(ProductsActionTypes.PRODUCTS_LOAD_FAIL, action.payload);
    }
}

const productsStore = new ProductsStore();
productsStore.dispatchToken = Dispatcher.register(productsStore.handleActions.bind(productsStore));
export default productsStore;