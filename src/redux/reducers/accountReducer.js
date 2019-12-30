import constants from '../constants';

var initialState = {
  user: {
    photos: [],
  },
};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case constants.USER_RECIEVED:
      const user = {
        id: action.data.uid,
        // photos: action.data,
      };
      // console.log(action);
      newState.user = user;
      return newState;
    default:
      return state;
  }
};
