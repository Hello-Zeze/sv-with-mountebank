import Dispatcher from '../Dispatcher';
import OrdersWebservice from './OrdersWebservice';
import {OrdersActionTypes} from './OrdersActionTypes';

export default class OrdersActionCreator {

    static loadOrders(clientId){
        OrdersWebservice.loadOrders(clientId).then(result=>{
            Dispatcher.dispatch({
                type: OrdersActionTypes.ORDERS_LOAD_SUCCESS,
                payload: result
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: OrdersActionTypes.ORDERS_LOAD_FAIL,
                payload: err
            });
        });
    }

    static createOrder(data){
        OrdersWebservice.createOrder(data).then(result=>{
            Dispatcher.dispatch({
                type: OrdersActionTypes.ORDER_CREATE_SUCCESS,
                payload: result
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: OrdersActionTypes.ORDER_CREATE_FAIL,
                payload: err
            });
        });
    }

    static getOrderData(orderId){
        OrdersWebservice.getOrderData(orderId).then(result=>{
            Dispatcher.dispatch({
                type: OrdersActionTypes.ORDER_DATA_LOAD_SUCCESS,
                payload: result
            });
        }).catch(err=>{
            Dispatcher.dispatch({
                type: OrdersActionTypes.ORDER_DATA_LOAD_FAIL,
                payload: err
            });
        });
    }
}