import * as types from './types';

function actionSuccess(boolean: boolean) {
    return {
        type: types.ACTION_SUCCESS,
        payload: boolean
    }
}



export {
    actionSuccess 
}



