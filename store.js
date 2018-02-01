import {createStore, combineReducers, applyMiddleware} from "redux";
import {persistCombineReducers, persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
//import FilesystemStorage from 'redux-persist-filesystem-storage'
import thunk from 'redux-thunk';
import counterReducer from "./src/Redux/Reducers/counterReducer";
import cardReducer from "./src/Redux/Reducers/cardReducer";
import NavigationReducer from "./src/Redux/Reducers/navigationReducer";
import loginReducer from "./src/Redux/Reducers/loginReducer";
//storage.clear();

const config = {
    key: "root",
    storage: storage,
    blacklist: ["counterString"]
};

const config1 = {
    key: "primary",
    storage: storage
};

const logger = store => next => action => {
    if (typeof action === 'function') 
        console.log('dispatching a function');
    else 
        console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

let middlewares = [logger, thunk];

// Object of all the reducers for redux-persist
const reducer = {
    counterReducer,
    cardReducer,
    NavigationReducer,
    loginReducer
};

// This will persist all the reducers, but I don't want to persist navigation
// state, so instead will use persistReducer. const rootReducer =
// persistCombineReducers(config, reducer) We are only persisting the
// counterReducer and loginRducer
const CounterReducer = persistReducer(config, counterReducer);
const LoginReducer = persistReducer(config1, loginReducer);
const CardReducer = persistReducer(config1, cardReducer);
// combineReducer applied on persisted(counterReducer) and NavigationReducer
const rootReducer = combineReducers({CounterReducer, NavigationReducer, LoginReducer, CardReducer});
let createAppStore = applyMiddleware(...middlewares)(createStore);

function configureStore() {
    let store = createAppStore(rootReducer);
    let persistor = persistStore(store);
    return {persistor, store};
}

export default configureStore;