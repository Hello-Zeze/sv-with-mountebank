import Dispatcher from '../Dispatcher';
import ShoppingCartWebservice from './ShoppingCartWebservice';
import {ShoppingCartActionTypes} from './ShoppingCartActionTypes';

export default class ShoppingCartActionCreator {

    static loadShoppingCart(){
        ShoppingCartWebservice.loadShoppingCartData().then(result=>{
            Dispatcher.dispatch({
                type: ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS,
                payload: result
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: ShoppingCartActionTypes.SHOPPING_CART_LOAD_FAIL,
                payload: err
            });
        });
    }

    static addItemToShoppingCart(productData){
        ShoppingCartWebservice.addToShoppingCart(productData).then(result=>{
            Dispatcher.dispatch({
                type: ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS,
                payload: result
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_FAIL,
                payload: err
            });
        });
    }
}