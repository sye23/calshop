import * as types from './types';

function dateSuccess(date: any) {
    return {
        type: types.ADD_DATE_SUCCESS,
        payload: date
    }
}

function removeDateSuccess() {
    return {
        type: types.REMOVE_DATE_SUCCESS,
        payload: ''
    }
}

function addCustomerSuccess(obj: any){
    return {
        type: types.ADD_CUSTOMER_SUCCESS,
        payload: obj
    }
}

function removeCustomerSuccess(){
    return {
        type: types.REMOVE_CUSTOMER_SUCCESS,
        payload: {}
    }
}



export {
    dateSuccess,
    removeDateSuccess,
    addCustomerSuccess,
    removeCustomerSuccess 
}



