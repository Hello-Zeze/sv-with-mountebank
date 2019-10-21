import React from 'react';
import PropTypes from 'prop-types';
import OrdersActionCreator from './OrdersActionCreator';
import { OrdersActionTypes } from './OrdersActionTypes';
import OrdersStore from './OrdersStore';
import RecommendationsWidget from '../recommendations/RecommendationsWidget';

export default class PlaceOrder extends React.Component {
    static propTypes = {
        Open: PropTypes.bool.isRequired,
        ProductId: PropTypes.number.isRequired,
        ProductTitle: PropTypes.string.isRequired,
        OnClose: PropTypes.func.isRequired
    };  
    constructor(props){
        super(props);
        this.state = {
            recipient: undefined,
            contactNumber:undefined,
            address:{
                text:undefined,
                lat: undefined,
                lng: undefined
            }
        };
    }

    componentWillMount(){
        OrdersStore.addEventListener(OrdersActionTypes.ORDER_CREATE_SUCCESS, this.handleOrderCreateSuccess);
        OrdersStore.addEventListener(OrdersActionTypes.ORDER_CREATE_FAIL, this.handleOrderCreateFail);
    }

    componentWillUnmount(){
        OrdersStore.removeEventListener(OrdersActionTypes.ORDER_CREATE_SUCCESS, this.handleOrderCreateSuccess);
        OrdersStore.removeEventListener(OrdersActionTypes.ORDER_CREATE_FAIL, this.handleOrderCreateFail);
    }

    handleOrderCreateSuccess = (data) => {
        //TODO: Show toastr
        this.cleanupAndClose();
    }

    handleOrderCreateFail = (data) => {
        //TODO: show toastr
    }

    createOrder = () => {
        const orderData = {
            recipient: this.state.recipient,
            contactNumber:this.state.contactNumber,
            address:{
                text:this.state.address.text,
                lat: this.state.address.lat,
                lng: this.state.address.lng
            },
            productId: this.props.ProductId
        };
        OrdersActionCreator.createOrder(orderData);
    }

    handleCancel = () => {
        this.cleanupAndClose();
    }

    cleanupAndClose = () =>{
        this.setState({
            recipient: undefined,
            contactNumber:undefined,
            address:{
                text:undefined,
                lat: undefined,
                lng: undefined
            }
        });
        this.props.OnClose();
    }

    render(){
        return(
            <div>
                <Dialog open={this.props.Open} onClose={this.cleanupAndClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">                    
                    <DialogTitle id="alert-dialog-title">{`Yes!! I've always wanted a ${this.props.ProductTitle}`}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="recipient"
                            label="Recipient"
                            type="text"
                            fullWidth
                            value={this.state.recipient}
                            onChange={(e)=>{this.setState({recipient: e.target.value})}}
                        />
                        <TextField
                            margin="dense"
                            id="contact-number"
                            label="Contact Number"
                            type="text"
                            fullWidth
                            value={this.state.contactNumber}
                            onChange={(e)=>{this.setState({contactNumber: e.target.value})}}
                        />
                        <TextField
                            margin="dense"
                            id="delivery-location"
                            label="Delivery Address"
                            type="text"
                            fullWidth
                            value={this.state.address.text}
                            onChange={this.handleAddressOnChange}
                            onFocus={this.initializeAutoComplete}
                        />
                        <TextField
                            disabled
                            margin="dense"
                            id="inc-coords"
                            label="Riiiight here"
                            type="text"
                            fullWidth
                            value={`${this.state.address.lat}, ${this.state.address.lng}`}
                            onChange={(e)=>{
                                const position = {};
                                position.lat = e.target.value.substr(0,(e.target.value.indexOf(',')));
                                position.lng = e.target.value.substr((e.target.value.indexOf(',')+1));
                                this.setState({address: {text: this.state.address.text, lat: position.lat, lng: position.lng}});
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Yeah, maybe not
                        </Button>
                        <Button onClick={this.createAmbulanceRequest} color="primary">
                            Gimme gimme gimme!!
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
