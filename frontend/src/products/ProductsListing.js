import React from 'react';
import _ from 'lodash';
import ProductsActionCreator from './ProductsActionCreator';
import OrdersActionCreator from '../orders/OrdersActionCreator';
import { OrdersActionTypes } from '../orders/OrdersActionTypes';
import OrdersStore from '../orders/OrdersStore';
import ShoppingCartActionCreator from '../shopping-cart/ShoppingCartActionCreator';
import { ShoppingCartActionTypes } from '../shopping-cart/ShoppingCartActionTypes';
import ShoppingCartStore from '../shopping-cart/ShoppingCartStore';
import ProductsStore from './ProductsStore';
import { ProductsActionTypes } from './ProductsActionTypes';
import ProductListingItem from './ProductListingItem';
import OrderDetails from '../orders/OrderDetails';
import './products-listing.css';

export default class ProductsListing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productsList:[],
            orderDetailsDialogOpen: false,
            selectedProductData: {}
        };
    }

    componentWillMount(){
        ProductsStore.addEventListener(ProductsActionTypes.PRODUCTS_LOAD_SUCCESS, this.handleProductsLoadSuccess);
        OrdersStore.addEventListener(OrdersActionTypes.ORDER_CREATE_SUCCESS, this.handleOrderCreated);
        ShoppingCartStore.addEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS,this.handleShoppingCartUpdated);
    }

    componentWillUnmount(){
        ProductsStore.removeEventListener(ProductsActionTypes.PRODUCTS_LOAD_SUCCESS, this.handleProductsLoadSuccess);
        OrdersStore.removeEventListener(OrdersActionTypes.ORDER_CREATE_SUCCESS, this.handleOrderCreated);
        ShoppingCartStore.removeEventListener(ShoppingCartActionTypes.SHOPPING_CART_ADD_ITEM_SUCCESS,this.handleShoppingCartUpdated);
    }

    componentDidMount(){
        ProductsActionCreator.loadProducts();
    }
    
    handleProductsLoadSuccess = (data) => {
        this.setState({productsList: data});
    }

    handleItemPurchaseClick = (data) => {
        OrdersActionCreator.createOrder(data);
    }

    handleOrderCreated = (data) => {
        const updatedProductData = this.state.productsList.map(product=>{
            if(product.id === data.productId){
                product.orderId = data.id;
            }
            return product;
        });
        this.setState({productsList: updatedProductData});
        ShoppingCartActionCreator.addItemToShoppingCart({orderId: data.id, productId: data.productId});
    }

    handleShoppingCartUpdated = (data) => {
        const updatedProductList = this.state.productsList.map(item=>{
            item.purchased = (item.id === data.productId);
            return item;
        });
        this.setState({productsList: updatedProductList});
    }

    handleViewOrderDetails = (data) => {
        data.orderStatus = OrdersStore.transformState(state=>{
            const order = state.orders.filter(x=>x.id === data.orderId);
            return order[0].status;
        });
        this.setState({
            orderDetailsDialogOpen:true,
            selectedProductData: data
        });
    }

    render(){
        return(
            <div id="products-listing-container">
                {_.map(this.state.productsList, product=>{
                    return <ProductListingItem
                             key={product.id}
                             Id={product.id}
                             Title={product.title}
                             Description={product.desc}
                             Price={product.price}
                             ImgUrl={product.imgUrl}
                             PurchaseClickCb={this.handleItemPurchaseClick}
                             OrderDetailsCickCb={this.handleViewOrderDetails}
                             Purchased={product.purchased||false}
                             OrderId={product.orderId}
                           />
                })}
                <OrderDetails
                 Open={this.state.orderDetailsDialogOpen}
                 Title={this.state.selectedProductData.title||""}
                 Desc={this.state.selectedProductData.desc||""}
                 Price={this.state.selectedProductData.price||""}
                 OrderId={this.state.selectedProductData.orderId}
                 OrderStatus={this.state.selectedProductData.orderStatus}
                 OnClose={()=>{this.setState({orderDetailsDialogOpen: false})}} />
            </div>
        );
    }
}