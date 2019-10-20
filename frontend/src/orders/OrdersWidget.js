import React from 'react';
import OrdersActionCreator from './OrdersActionCreator';
import {OrdersActionTypes} from './OrdersActionTypes';
import OrdersStore from './OrdersStore';

export default class OrdersWidget extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orderCount: 0
        };
    }

    componentWillMount(){
        OrdersStore.addEventListener(OrdersActionTypes.ORDERS_LOAD_SUCCESS, this.handleOrdersLoadSuccess);
        OrdersStore.addEventListener(OrdersActionTypes.ORDERS_LOAD_FAIL, this.handleOrdersLoadFail);
        OrdersStore.addEventListener(OrdersActionTypes.ORDER_CREATE_SUCCESS, this.handleCreateOrderSuccess);
        OrdersStore.addEventListener(OrdersActionTypes.ORDER_CREATE_FAIL, this.handleCreateOrderFail);
    }

    componentWillUnmount(){
        OrdersStore.removeEventListener(OrdersActionTypes.ORDERS_LOAD_SUCCESS, this.handleOrdersLoadSuccess);
        OrdersStore.removeEventListener(OrdersActionTypes.ORDERS_LOAD_FAIL, this.handleOrdersLoadFail);
        OrdersStore.removeEventListener(OrdersActionTypes.ORDER_CREATE_SUCCESS, this.handleCreateOrderSuccess);
        OrdersStore.removeEventListener(OrdersActionTypes.ORDER_CREATE_FAIL, this.handleCreateOrderFail);
    }

    componentDidMount(){
        OrdersActionCreator.loadOrders();
    }

    handleOrdersLoadSuccess = (data) => {
        this.setState({orderCount: data.length});
    }
    
    handleOrdersLoadFail = (data) => {
        //TODO: show toast
    }

    handleCreateOrderSuccess = (data) => {
        //TODO: show toast
    }

    handleCreateOrderFail = (data) => {
        //TODO: show toast
    }

    render(){
        return(
            <div id="orders-widget-container">
                <div>{'My Orders'}</div>
                {(this.state.orderCount === 0)?(null):(
                    <div id="orders-badge">{this.state.orderCount}</div>
                )}
            </div>
        );
    }
}