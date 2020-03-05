import keyMirror from 'keymirror';

export const OrdersActionTypes = keyMirror({
    ORDER_CREATE_SUCCESS:null,
    ORDER_CREATE_FAIL:null,
    ORDERS_LOAD_SUCCESS:null,
    ORDERS_LOAD_FAIL:null,
    ORDER_DATA_LOAD_SUCCESS:null,
    ORDER_DATA_LOAD_FAIL:null,
    ORDER_DELETE_SUCCESS:null,
    ORDER_DELETE_FAIL:null
});