import React from 'react';
import PropTypes from 'prop-types';
import ShoppingCartItem from './ShoppingCartItem';
import ShoppingCartActionCreator from './ShoppingCartActionCreator';
import { ShoppingCartActionTypes } from './ShoppingCartActionTypes';
import ShoppingCartStore from './ShoppingCartStore';
import OrderActionCreator from '../orders/OrdersActionCreator';
import { OrderActionTypes } from '../orders/OrdersActionTypes';
import OrderStore from '../orders/OrdersStore';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';

export default class ShoppingCartDetails extends React.Component {
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
        
    }

    componentWillUnmount(){
        
    }

    componentDidMount(){
        //ShoppingCartActionCreator.loadShoppingCart(this.props.CartId);
    }

    handleShoppingCartLoadSuccess = (data) => {
        this.setState({items: data});
    }

    handleOnItemRemove = (data) => {

    }

    render(){
        return(
            <div>
                <Dialog open={this.props.Open} onClose={this.props.onClose} aria-labelledby="shopping-cart-dialog-title" aria-describedby="shopping-cart-dialog-description">
                        <DialogTitle id="shopping-cart-dialog-title">{"Shopping Cart"}</DialogTitle>
                        <DialogContent>                        
                            {this.state.items.map(item=>{
                                return <ShoppingCartItem
                                        Id={item.shoppingCartItemId}
                                        OrderId={item.orderId}
                                        ProductTitle={item.productTitle}
                                        ProductDesc={item.productDesc}
                                        ProductPrice={item.productPrice}
                                        ProductImgUrl={item.productImgUrl}
                                        OnRemoveItem={this.handleOnItemRemove} />
                            })}
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.props.OnClose} color="primary">
                                Cancel Order
                            </Button>
                            <Button onClick={this.props.OnClose} color="primary">
                                Dismiss
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        );
    }
}