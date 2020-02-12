import React from 'react';
import PropTypes from 'prop-types';
import './product-listing-item.css';
export default class ProductListingItem extends React.Component {
    static propTypes = {
        Id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Price: PropTypes.string,
        ImgUrl: PropTypes.string.isRequired,
        PurchaseClickCb: PropTypes.func.isRequired
    };
    handlePurchaseClick = (e) => {
        const data = {
            productId: e.target.dataset.productid,
            price: e.target.dataset.price
        };
        this.props.PurchaseClickCb(data);
    }
    render(){
        return(
            <div className="product-item-container">
                <div className="p-abs product-img">
                    <img src={this.props.ImgUrl} title={this.props.Title} />
                </div>
                <div className="p-abs product-img-overlay"></div>
                <div className="price-badge">{this.props.Price}</div>
                <div className="product-data-overlay">                    
                    <div className="product-data">
                        <div className="product-title">{this.props.Title}</div>
                        <div className="product-desc">{this.props.Description}</div>
                    </div>
                    <div data-productid={this.props.Id} data-price={this.props.Price} className="btn-buy" onClick={(e)=>{this.handlePurchaseClick(e);}} >OMG! I want it</div>
                </div>
            </div>
        );
    }
}