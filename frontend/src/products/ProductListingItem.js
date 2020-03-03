import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Chip } from '@material-ui/core';
import './product-listing-item.css';

export default class ProductListingItem extends React.Component {
    static propTypes = {
        Id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Price: PropTypes.string,
        ImgUrl: PropTypes.string.isRequired,
        PurchaseClickCb: PropTypes.func.isRequired,
        OrderDetailsCickCb: PropTypes.func.isRequired,
        Purchased: PropTypes.bool.isRequired,
        OrderId: PropTypes.string.isRequired
    };
    handlePurchaseClick = (e) => {
        const data = {
            productId: e.target.dataset.productid,
            price: e.target.dataset.price
        };
        this.props.PurchaseClickCb(data);
    }

    handleViewOrderDetailsClick = (e) => {
        const data = {
            title: this.props.Title,
            desc: this.props.Description,
            price: this.props.Price,
            orderId: e.target.dataset.orderid
        };
        this.props.OrderDetailsCickCb(data);
    }

    render(){
        return(
            <div className="product-item-container">
                <div className="price-badge">{this.props.Price}</div>
                <div className="product-img">
                    <img src={this.props.ImgUrl} title={this.props.Title} />
                </div>                
                <div className="product-data">
                    <div className="product-title">{this.props.Title}</div>
                    <div className="product-desc">{this.props.Description}</div>
                </div>
                {(!this.props.Purchased)?
                    <div className="btn btn-buy" data-productid={this.props.Id} data-price={this.props.Price} onClick={(e)=>{this.handlePurchaseClick(e);}} size="medium" color="primary">OMG! I want it</div>:
                    <div className="btn btn-view-order" data-productid={this.props.Id} data-orderid={this.props.OrderId} onClick={(e)=>{this.handleViewOrderDetailsClick(e);}} size="medium" color="secondary">View Order Details</div>
                }
            </div>
        );
    }
}