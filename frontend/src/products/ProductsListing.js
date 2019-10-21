import React from 'react';
import ProductsActionCreator from './ProductsActionCreator';
import ProductsStore from './ProductsStore';
import { ProductsActionTypes } from './ProductsActionTypes';
import './products-listing.scss';

export default class ProductsListing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productsList:[]
        }
    }

    componentWillMount(){
        ProductsStore.addEventListener(ProductsActionTypes.PRODUCTS_LOAD_SUCCESS, this.handleProductsLoadSuccess);
        ProductsStore.addEventListener(ProductsActionTypes.PRODUCTS_LOAD_FAIL, this.handleProductsLoadFail);
    }

    componentWillUnmount(){
        ProductsStore.removeEventListener(ProductsActionTypes.PRODUCTS_LOAD_SUCCESS, this.handleProductsLoadSuccess);
        ProductsStore.removeEventListener(ProductsActionTypes.PRODUCTS_LOAD_FAIL, this.handleProductsLoadFail);
    }

    componentDidMount(){
        ProductsActionCreator.loadProducts();
    }
    
    handleProductsLoadSuccess = (data) => {
        this.setState({productsList: data});
    }

    handleProductsLoadFail = (data) => {
        //TODO: show toastr
    }

    render(){
        return(
            <div></div>
        );
    }
}