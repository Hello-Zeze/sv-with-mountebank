import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core';
import { ShoppingCartRounded }from '@material-ui/icons';
import ShoppingCartActionCreator from '../shopping-cart/ShoppingCartActionCreator';
import ShoppingCartStore from '../shopping-cart/ShoppingCartStore';
import { ShoppingCartActionTypes } from '../shopping-cart/ShoppingCartActionTypes';

import './mainbar.css';

export default class MainBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shoppingCartItemCount:0
        }
    }

    componentWillMount(){
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS, this.handleShoppingCartLoaded);
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS, this.handleShoppingCartUpdated);
    }

    componentWillUnmount(){
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS, this.handleShoppingCartLoaded);
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS, this.handleShoppingCartUpdated);
    }

    componentDidMount(){
        ShoppingCartActionCreator.loadShoppingCart();
    }

    handleShoppingCartLoaded = (data) => {
        this.setState({shoppingCartItemCount: data.length});
    }

    handleShoppingCartUpdated = (data) => {
        const shoppingItemCount = ShoppingCartStore.transformState(state=>state.cartItems.length);
        this.setState({shoppingCartItemCount: shoppingItemCount});
    }

    render(){
        return(
            <div id="main-app-bar">
                <AppBar position="static" color="default">
                    <Toolbar>                    
                        <Typography variant="h6" noWrap>
                            Ducks 'R' Us
                        </Typography>
                        <IconButton aria-label="" color="inherit">
                            {(this.state.shoppingCartItemCount === 0)?
                            <ShoppingCartRounded />:
                            <Badge badgeContent={this.state.shoppingCartItemCount} color="secondary">
                                <ShoppingCartRounded />
                            </Badge>
                            }                            
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}