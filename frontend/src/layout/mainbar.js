import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core';
import { ShoppingCartRounded }from '@material-ui/icons';
import ShoppingCartActionCreator from '../shopping-cart/ShoppingCartActionCreator';
import ShoppingCartStore from '../shopping-cart/ShoppingCartStore';
import { ShoppingCartActionTypes } from '../shopping-cart/ShoppingCartActionTypes';
import ShoppingCartDetails from '../shopping-cart/ShoppingCartDetails';
import ProductsStore from '../products/ProductsStore';
import './mainbar.css';

export default class MainBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shoppingCartItemsData:[],
            shoppingCartItemCount:0,
            shoppingCartDialogOpened:false
        }
    }

    componentWillMount(){
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS, this.handleShoppingCartLoaded);
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS, this.handleShoppingCartUpdated);
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_REMOVE_ITEM_SUCCESS, this.handleShoppingCartUpdated);
    }

    componentWillUnmount(){
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_LOAD_SUCCESS, this.handleShoppingCartLoaded);
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS, this.handleShoppingCartUpdated);
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_REMOVE_ITEM_SUCCESS, this.handleShoppingCartUpdated);
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

    handleShoppingCartClicked = (e) => {
        const products = ProductsStore.transformState(state=>state.products);
        const shoppingCartItems = ShoppingCartStore.transformState(state=>state.cartItems);
        const shoppingCartItemsData = shoppingCartItems.map(item=>{
            const productData = products.filter(product=>product.id === item.productId)[0];
            return {
                shoppingCartItemId: item.id,
                orderId: item.orderId,
                productTitle: productData.title,
                productDesc: productData.desc,
                productPrice: productData.price,
                productImgUrl: productData.imgUrl
            };
        });        
        this.setState({shoppingCartDialogOpened:true, shoppingCartItemsData});
    }

    handleShoppingCartDetailsOnClose = () => {
        this.setState({shoppingCartDialogOpened:false});
    }

    render(){
        return(
            <div id="main-app-bar">
                <AppBar position="static" color="default">
                    <Toolbar>                    
                        <Typography variant="h6" noWrap>
                            Ducks 'R' Us
                        </Typography>
                        <IconButton id="shopping-cart-ico" aria-label="" color="inherit" onClick={(e)=>{this.handleShoppingCartClicked(e);}}>
                            {(this.state.shoppingCartItemCount === 0)?
                            <ShoppingCartRounded />:
                            <Badge badgeContent={this.state.shoppingCartItemCount} color="secondary">
                                <ShoppingCartRounded />
                            </Badge>
                            }                            
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <ShoppingCartDetails 
                  Open={this.state.shoppingCartDialogOpened}
                  Items={this.state.shoppingCartItemsData}
                  OnClose={this.handleShoppingCartDetailsOnClose}/>
            </div>
        );
    }
}