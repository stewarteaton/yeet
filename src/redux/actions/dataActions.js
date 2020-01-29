import constants from '../constants';
import axios from 'axios';

// Get all shouts
export const getPosts = () => dispatch => {
  dispatch({type: constants.LOADING_DATA});
  axios
    .get('/posts')
    .then(res => {
      dispatch({
        type: constants.SET_POSTS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: constants.SET_POSTS,
        payload: [],
      });
      return err;
    });
};

// Get available forumns
// var getPosts = () => ({
//     type: constants.LOADING_UI,
//   });
