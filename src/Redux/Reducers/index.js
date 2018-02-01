
import { combineReducers } from 'redux';
import userReducer from './user';
import itemReducer from './item';

export default combineReducers({
	userStore: userReducer,
	itemStore: itemReducer
});
