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
            case OrdersActionTypes.ORDER_DATA_LOAD_SUCCESS:
                this.handleOrderDataLoadSuccess(action);
                break;
            case OrdersActionTypes.ORDER_DATA_LOAD_FAIL:
                this.handleOrderDataLoadFail(action);
                break;
            case OrdersActionTypes.ORDER_DELETE_SUCCESS:
                this.handleOrderDeleteSuccess(action);
                break;
            case OrdersActionTypes.ORDER_DELETE_FAIL:
                this.handleOrderDeleteFail(action);
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
        this.state.orders.push(action.payload);
        this.emit(OrdersActionTypes.ORDER_CREATE_SUCCESS, action.payload);
    }

    handleCreateOrderFail(action){
        this.emit(OrdersActionTypes.ORDER_CREATE_FAIL, action.payload);
    }

    handleOrderDataLoadSuccess(action){
        const updatedOrders = this.state.orders.map(order=>{
            if(order.id === action.payload.id){
                order.status = action.payload.status;
            }
        });
        this.state.orders = updatedOrders;
        this.emit(OrdersActionTypes.ORDER_DATA_LOAD_SUCCESS, action.payload);
    }

    handleOrderDataLoadFail(action){
        this.emit(OrdersActionTypes.ORDER_DATA_LOAD_FAIL, action.payload);
    }

    handleOrderDeleteSuccess(action){
        this.state.orders = this.state.orders.map(order=>{
            if(order.id !== action.payload.orderId){
                return order;
            }
        });
        this.emit(OrdersActionTypes.ORDER_DELETE_SUCCESS, this.state.orders);
    }
    
    handleOrderDeleteFail(action){  
        this.emit(OrdersActionTypes.ORDER_DELETE_FAIL, action.payload);
    }
}

const ordersStore = new OrdersStore();
ordersStore.dispatchToken = Dispatcher.register(ordersStore.handleActions.bind(ordersStore));
export default ordersStore;