import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrdersActionCreator from './OrdersActionCreator';
import { OrdersActionTypes } from './OrdersActionTypes';
import OrdersStore from './OrdersStore';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';

export default class OrderDetails extends Component {
    static propTypes = {
        Open: PropTypes.bool.isRequired,
        Title: PropTypes.string.isRequired,
        Desc: PropTypes.string.isRequired,
        Price: PropTypes.string.isRequired,
        OrderId: PropTypes.string,
        OrderStatus: PropTypes.string,
        OnClose: PropTypes.func.isRequired,
        OnCancelOrder: PropTypes.func.isRequired
    }

    render(){
        return(
            <div>
                <Dialog open={this.props.Open} onClose={this.props.onClose} aria-labelledby="order-details-dialog-title" aria-describedby="order-details-dialog-description">
                        <DialogTitle id="order-details-dialog-title">{"Order Details"}</DialogTitle>
                        <DialogContent>                        
                            <TextField
                                disabled
                                margin="dense"
                                id="prod-title"
                                label="Product Title"
                                type="text"
                                fullWidth
                                value={this.props.Title}
                            />
                            <TextField
                                disabled
                                margin="dense"
                                id="prod-desc"
                                label="Product Description"
                                type="text"
                                fullWidth
                                value={this.props.Desc}
                            />
                            <TextField
                                disabled
                                margin="dense"
                                id="prod-price"
                                label="Product Price"
                                type="text"
                                fullWidth
                                value={this.props.Price}
                            />
                            <TextField
                                disabled
                                margin="dense"
                                id="order-status"
                                label="Order Status"
                                type="text"
                                fullWidth
                                value={this.props.OrderStatus}
                            />
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
        )
    }
}