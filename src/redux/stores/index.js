// import { combineReducers, configureStore, createStore } from 'redux';
import {combineReducers, createStore} from 'redux';
import accountReducer from '../reducers/accountReducer';
import postReducer from '../reducers/postReducer';

const initialState = {};

const reducers = combineReducers({
  account: accountReducer,
  post: postReducer,
});

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
