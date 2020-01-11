import constants from '../constants';

var initialState = {
  id: '',
  email: '',
  userName: '',
  photos: [],
  loading: false,
  authenticated: false,
};

export default (state = initialState, action) => {
  console.log('reduce');
  console.log(action);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.USER_RECIEVED:
      // console.log('REDUCER ACTION');
      // console.log(action);
      // const user = {
      //   uid: action.data.uid,
      //   userName: action.data.userName,
      //   // email: action.data.data.user.email,
      //   // photos: action.data,
      // };
      // console.log(user);
      // newState.user = user;
      // newState.authenticated = true;
      // newState.loading = false;

      return newState;
    case constants.SET_USER:
      console.log('ACTION PAyLOAD');
      console.log(action.data);
      return {
        authenticated: true,
        loading: false,
        ...action.data, // spread payload bins credetials, likes,etc. to user
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
