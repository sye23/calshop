import * as types from '../actions/types';


export default function dateReducer(state :any = null, action:any) {
    switch(action.type) {
        case types.DATE_SUCCESS:
            let stateCopy = Object.assign({}, state);
            stateCopy= action.payload;
            return stateCopy;
        case types.REMOVE_DATE_SUCCESS:
            let removeStateCopy = Object.assign({}, state);
            removeStateCopy= action.payload;
            return removeStateCopy;
        default:
            return state
    }
}