import constants from '../constants';

var initialState = {
  user: {
    id: '',
    email: '',
    userName: '',
    photos: [],
    loading: false,
  },
};

export default (state = initialState, action) => {
  console.log('reduce');
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.USER_RECIEVED:
      console.log('REDUCER ACTION');
      console.log(action);
      const user = {
        uid: action.data.uid,
        userName: action.data.userName,
        // email: action.data.data.user.email,
        // photos: action.data,
      };
      console.log(user);
      newState.user = user;
      return newState;
    case constants.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload, // spread payload bins credetials, likes,etc. to user
      };
    case constants.LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
