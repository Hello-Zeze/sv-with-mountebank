import Dispatcher from '../Dispatcher';
import BaseStore from '../common/stores/BaseStore';
import { OrdersActionTypes } from './OrdersActionTypes';

class OrdersStore extends BaseStore{
    constructor(){
        super();
        this.state = {
            orders: []
        };
    }

    handleActions(action){
        switch(action.type){
            case OrdersActionTypes.ORDERS_LOAD_SUCCESS:
                this.handleOrdersLoadSuccess(action);
                break;
            case OrdersActionTypes.ORDERS_LOAD_FAIL:
                this.handleOrdersLoadFail(action);
                break;
            case OrdersActionTypes.ORDER_CREATE_SUCCESS:
                this.handleCreateOrderSuccess(action);
                break;
            case OrdersActionTypes.ORDER_CREATE_FAIL:
                this.handleCreateOrderFail(action);
                break;
            default:
                break;
        }
    }

    handleOrdersLoadSuccess(action){
        this.state.orders = action.payload;
        this.emit(OrdersActionTypes.ORDERS_LOAD_SUCCESS, this.state.orders);
    }

    handleOrdersLoadFail(action){        
        this.emit(OrdersActionTypes.ORDERS_LOAD_FAIL, action.payload);
    }

    handleCreateOrderSuccess(action){
        this.emit(OrdersActionTypes.ORDER_CREATE_SUCCESS, action.payload);
    }

    handleCreateOrderFail(action){
        this.emit(OrdersActionTypes.ORDER_CREATE_FAIL, action.payload);
    }
}

const ordersStore = new OrdersStore();
ordersStore.dispatchToken = Dispatcher.register(ordersStore.handleActions.bind(ordersStore));
export default ordersStore;