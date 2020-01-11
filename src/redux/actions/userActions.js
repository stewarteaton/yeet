import constants from '../constants';
import axios from 'axios';
  
// export const loginUser = userData => dispatch => {
//   console.log('THI STHIS THIS');
//   dispatch({type: constants.LOADING_UI});
//   console.log('asdfasdfasdf');
//   axios
//     .post('/login', userData)
//     .then(res => {
//       dispatch(getUserData());
//       dispatch({type: constants.CLEAR_ERRORS});
//       // navigation.navigate({routeName: 'main'});
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({
//         // will do to global state
//         type: constants.SET_ERRORS,
//         payload: err.response.data,
//       });
//     });
//     console.log('sdfsdf');
// };

// export const getUserData = () => dispatch => {
//   dispatch({type: constants.LOADING_USER});
//   axios
//     .get('/user')
//     .then(res => {
//       dispatch({
//         type: constants.SET_USER,
//         // payload is date we send to reducer which then does something with it
//         payload: res.data,
//       });
//     })
//     .catch(err => console.log(err));
// };

// var userRecieved = user => ({
//   type: constants.USER_RECIEVED,
//   data: user,
// });

var loadingUI = () => ({
  type: constants.LOADING_UI,
});

var loadingUser = () => ({
  type: constants.LOADING_USER,
});

var clearUIErrors = () => ({
  type: constants.CLEAR_ERRORS,
});

var setUIErrors = data => ({
  type: constants.SET_ERRORS,
  payload: data,
});

var userRecieved = user => ({
  type: constants.SET_USER,
  data: user,
});

export default {
  loadingUI,
  loadingUser,
  clearUIErrors,
  setUIErrors,
  userRecieved,
};
