import Dispatcher from '../Dispatcher';
import BaseStore from '../common/stores/BaseStore';
import { ShoppingCartActionTypes } from './ShoppingCartActionTypes';

class ShoppingCartStore extends BaseStore{
    constructor(){
        super();
        this.state = {
            cartItems:[]
        };
    }

    handleActions(action){
        switch(action.type){
            case ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS:
                this.handleShoppingCartLoadSuccess(action);
                break;
            case ShoppingCartActionTypes.SHOPPING_CART_LOAD_FAIL:
                this.handleShoppingCartLoadFail(action);
                break;
            case ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS:
                this.handleShoppingCartAddItemSuccess(action);
                break;
            case ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_FAIL:
                this.handleShoppingCartAddItemFail(action);
                break;
            default:
                break;
        }
    }

    handleShoppingCartLoadSuccess(action){
        this.state.cartItems = action.payload;
        this.emit(ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS, this.state.cartItems);
    }

    handleShoppingCartLoadFail(action){
        this.emit(ShoppingCartActionTypes.SHOPPING_CART_LOAD_FAIL, action.payload);
    }

    handleShoppingCartAddItemSuccess(action){
        this.state.cartItems.push(action.payload);
        this.emit(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS, this.state.cartItems);
    }

    handleShoppingCartAddItemFail(action){
        this.emit(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_FAIL, action.payload);
    }
}

const shoppingCartStore = new ShoppingCartStore();
shoppingCartStore.dispatchToken = Dispatcher.register(shoppingCartStore.handleActions.bind(shoppingCartStore));
export default shoppingCartStore;