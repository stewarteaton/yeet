// import { combineReducers, configureStore, createStore } from 'redux';
import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import userReducer from '../reducers/userReducer';
import uiReducer from '../reducers/uiReducer';
import dataReducer from '../reducers/dataReducer';
//Test
// import thunk from 'redux-thunk';

const initialState = {};

const reducers = combineReducers({
  account: userReducer,
  data: dataReducer,
  UI: uiReducer,
});
//TEST
// can use any middleware 
// const middleware = [thunk];
// const composeEnhancers = typeof window === 'object' && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, initialState);

export default store;

// export default {
//     configureStore: initial => {
//         const rootReducer = combineReducers({
//             account: accountReducer,
//             post: postReducer,
//         });

//         store = createStore(rootReducer, initial);

//         return store;
//     },
//     currentStore: ()=>{
//         return store;
//     }
// }
