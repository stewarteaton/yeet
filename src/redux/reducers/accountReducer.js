import constants from '../constants';

var initialState = {
  user: {
    id: '',
    email: '',
    userName: '',
    photos: [],
  },
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.USER_RECIEVED:
      const user = {
        id: action.data.data.user.uid,
        email: action.data.data.user.email,
        userName: action.data.data.user.userName,
        // photos: action.data,
      };
      newState.user = user;
      return newState;
    default:
      return state;
  }
};
