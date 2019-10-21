import React from 'react';
import PropTypes from 'prop-types';
import ShoppingCartActionCreator from './ShoppingCartActionCreator';
import { ShoppingCartActionTypes } from './ShoppingCartActionTypes';
import ShoppingCartStore from './ShoppingCartStore';

export default class ShoppingCartWidget extends React.Component {
    static propTypes = {
        CartId: PropTypes.number.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    componentWillMount(){
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS, this.handleShoppingCartLoadSuccess);
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_LOAD_FAIL, this.handleShoppingCartLoadFail);
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS, this.handleAddShoppingCartItemSuccess);
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_FAIL, this.handleAddShoppingCartItemFail);
    }

    componentWillUnmount(){
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS, this.handleShoppingCartLoadSuccess);
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_LOAD_FAIL, this.handleShoppingCartLoadFail);
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS, this.handleAddShoppingCartItemSuccess);
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_FAIL, this.handleAddShoppingCartItemFail);
    }

    componentDidMount(){
        ShoppingCartActionCreator.loadShoppingCart(this.props.CartId);
    }

    handleShoppingCartLoadSuccess = (data) => {
        this.setState({items: data});
    }

    handleShoppingCartLoadFail = (data) => {
        this.setState({items:[]});
    }

    handleAddShoppingCartItemSuccess = (data) => {}

    handleAddShoppingCartItemFail = (data) => {}

    render(){
        return(
            <div></div>
        );
    }
}