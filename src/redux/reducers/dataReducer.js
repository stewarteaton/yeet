import constants from '../constants';

var initialState = {
  countryForumns: {},
  posts: [],
  post: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case constants.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
