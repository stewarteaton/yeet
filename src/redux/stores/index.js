import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
//Test
import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer';
import uiReducer from '../reducers/uiReducer';
import dataReducer from '../reducers/dataReducer';

const initialState = {};

//TEST
// can use any middleware 
const middleware = [thunk];

const reducers = combineReducers({
  account: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

// TEST
// const composeEnhancers = typeof window === 'object' && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;
// const enhancer = composeEnhancers(applyMiddleware(...middleware));
const enhancer = applyMiddleware(thunk);

const store = createStore(reducers, initialState, enhancer);

// const store = createStore(reducers, initialState);

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
