import { combineReducers, createStore} from 'redux';
import accountReducer from '../reducers/accountReducer';

const initialState = {};

const reducers = combineReducers({
  account: accountReducer,
//   post: postReducer,
});

const store = createStore(reducers, initialState);

export default store;
