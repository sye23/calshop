import * as types from '../actions/types';


export default function sampleReducer(state :any , action:any) {
    switch(action.type) {
        case types.ACTION_SUCCESS:
            let objCopy = Object.assign({}, state);
                objCopy= action.payload;
            return objCopy;
        default:
            return state
    }
}