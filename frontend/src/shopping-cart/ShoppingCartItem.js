import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './shopping-cart-item.css';

export default class ShoppingCartItem extends Component {
    static propTypes = {
        Id: PropTypes.string.isRequired,
        OrderId: PropTypes.string.isRequired,
        ProductTitle: PropTypes.string.isRequired,
        ProductDesc: PropTypes.string.isRequired,
        ProductPrice: PropTypes.string.isRequired,
        ProductImgUrl: PropTypes.string.isRequired,
        OnRemoveItem: PropTypes.func.isRequired
    }

    handleOnRemoveClick = (e) => {
        const data = {
            shoppingCartItemId: e.target.dataset.id,
            orderId: e.target.dataset.orderid
        };
        this.props.OnRemoveItem(data);
    }
    render(){
        return(
            <div className="shopping-cart-item-container">
                <div className="sc-item-data">
                    <img className="sci-img" src={this.props.ProductImgUrl} alt={`${this.props.ProductTitle} | ${this.props.ProductDesc}`} />
                </div>
                <div className="sc-item-data sci-td">
                    <div className="sci-title">{this.props.ProductTitle}</div>
                    <div className="sci-desc">{this.props.ProductDesc}</div>
                </div>
                <div className="sc-item-data sci-pr">
                    <div className="sci-price">{this.props.ProductPrice}</div>
                    <div data-id={this.props.Id} data-orderid={this.props.OrderId} className="sci-btn-remove" onClick={(e)=>{this.handleOnRemoveClick(e);}}>Remove</div>
                </div>
            </div>
        );
    }
}
