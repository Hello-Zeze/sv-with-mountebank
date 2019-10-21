import Dispatcher from '../Dispatcher';
import ProductsWebservice from './ProductsWebservice';
import {ProductsActionTypes} from './ProductsActionTypes';

export default class OrdersActionCreator {

    static loadProducts(){
        ProductsWebservice.loadProducts().then(result=>{
            Dispatcher.dispatch({
                type: ProductsActionTypes.PRODUCTS_LOAD_SUCCESS,
                payload: result
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: ProductsActionTypes.PRODUCTS_LOAD_SUCCESS,
                payload: err
            });
        });
    }
}