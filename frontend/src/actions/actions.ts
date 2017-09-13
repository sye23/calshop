import * as types from './types';

function dateSuccess(date: any) {
    return {
        type: types.DATE_SUCCESS,
        payload: date
    }
}

function removeDateSuccess() {
    return {
        type: types.DATE_SUCCESS,
        payload: ''
    }
}



export {
    dateSuccess,
    removeDateSuccess 
}



