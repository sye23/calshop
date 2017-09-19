import { combineReducers } from 'redux';
import dateReducer from './dateReducer';
import customerReducer from './customerReducer';


const rootReducer = combineReducers({
    dateReducer,
    customerReducer
});

export default rootReducer;