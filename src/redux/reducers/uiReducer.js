import constants from '../constants';

const intitialState = {
  loading: false,
  errors: null,
};

export default function(state = intitialState, action) {
  switch (action.type) {
    case constants.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case constants.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case constants.LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case constants.STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
