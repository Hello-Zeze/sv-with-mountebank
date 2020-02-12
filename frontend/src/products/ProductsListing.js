import React from 'react';
import _ from 'lodash';
import ProductsActionCreator from './ProductsActionCreator';
import ProductsStore from './ProductsStore';
import { ProductsActionTypes } from './ProductsActionTypes';
import ProductListingItem from './ProductListingItem';
import './products-listing.css';

export default class ProductsListing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productsList:[]            
        }
    }

    componentWillMount(){
        ProductsStore.addEventListener(ProductsActionTypes.PRODUCTS_LOAD_SUCCESS, this.handleProductsLoadSuccess);        
    }

    componentWillUnmount(){
        ProductsStore.removeEventListener(ProductsActionTypes.PRODUCTS_LOAD_SUCCESS, this.handleProductsLoadSuccess);
    }

    componentDidMount(){
        ProductsActionCreator.loadProducts();
    }
    
    handleProductsLoadSuccess = (data) => {
        this.setState({productsList: data});
    }

    handleItemPurchaseClick = (data) => {
        
    }

    render(){
        return(
            <div id="products-listing-container">
                {_.map(this.state.productsList, product=>{
                    return <ProductListingItem id="products-listing-container"
                             key={product.id}
                             Id={product.id}
                             Title={product.title}
                             Description={product.desc}
                             Price={product.price}
                             ImgUrl={product.imgUrl}
                             PurchaseClickCb={this.handleItemPurchaseClick}
                           />
                })}
            </div>
        );
    }
}