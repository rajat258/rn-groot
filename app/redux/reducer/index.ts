import {combineReducers} from 'redux';
import {activeUserReducer, apiDataReducer} from '../slice';

const rootReducer = combineReducers({
  activeUser: activeUserReducer,
  apiData: apiDataReducer,
});

export {rootReducer};
