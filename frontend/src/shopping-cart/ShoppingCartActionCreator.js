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
                payload: {id: result, productId: productData.productId, orderId: productData.orderId}
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_FAIL,
                payload: err
            });
        });
    }

    static removeItemFromShoppingCart(itemId){
        ShoppingCartWebservice.deleteShoppingCartItem(itemId).then(result=>{
            Dispatcher.dispatch({
                type: ShoppingCartActionTypes.SHOPPING_CART_REMOVE_ITEM_SUCCESS,
                payload: {itemId}
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: ShoppingCartActionTypes.SHOPPING_CART_REMOVE_ITEM_FAIL,
                payload: err
            });
        });
    }
}