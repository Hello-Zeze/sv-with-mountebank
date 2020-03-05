import React from 'react';
import PropTypes from 'prop-types';
import ShoppingCartItem from './ShoppingCartItem';
import ShoppingCartActionCreator from './ShoppingCartActionCreator';
import { ShoppingCartActionTypes } from './ShoppingCartActionTypes';
import ShoppingCartStore from './ShoppingCartStore';
import OrderActionCreator from '../orders/OrdersActionCreator';
import ProductsStore from '../products/ProductsStore';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import './shopping-cart-details.css';

export default class ShoppingCartDetails extends React.Component {    
    static propTypes = {
        Open: PropTypes.bool.isRequired,
        Items: PropTypes.array.isRequired,
        OnClose: PropTypes.func.isRequired        
    }
    constructor(props){
        super(props);
        this.state = {
            removedItem: undefined
        };
    }

    componentWillMount(){
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_REMOVE_ITEM_SUCCESS, this.handleRemoveItemSuccess);
    }

    componentWillUnmount(){
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_REMOVE_ITEM_SUCCESS, this.handleRemoveItemSuccess);
    }

    handleOnItemRemove = (data) => {
        ShoppingCartActionCreator.removeItemFromShoppingCart(data.shoppingCartItemId);
        this.setState({removedItem:data});
    }

    handleRemoveItemSuccess = (data) => {
        OrderActionCreator.deleteOrder(this.state.removedItem.orderId);
        this.setState({removedItem:undefined});
    }

    render(){
        return(
            <div>
                <Dialog open={this.props.Open} onClose={this.props.onClose} aria-labelledby="shopping-cart-dialog-title" aria-describedby="shopping-cart-dialog-description">
                        <DialogTitle id="shopping-cart-dialog-title">{"Shopping Cart"}</DialogTitle>
                        <DialogContent>
                            <div id="shopping-cart-items-container">
                                {this.props.Items.map(item=>{
                                    return <ShoppingCartItem
                                            Id={item.shoppingCartItemId}
                                            OrderId={item.orderId}
                                            ProductTitle={item.productTitle}
                                            ProductDesc={item.productDesc}
                                            ProductPrice={item.productPrice}
                                            ProductImgUrl={item.productImgUrl}
                                            OnRemoveItem={this.handleOnItemRemove} />
                                })}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.OnClose} color="primary">
                                Dismiss
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        );
    }
}