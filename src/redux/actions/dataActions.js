import constants from '../constants';
import axios from 'axios';

// Get available forumns
var getPosts = () => ({
    type: constants.LOADING_UI,
  });