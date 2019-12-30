import constants from '../constants';

var userRecieved = user => ({
  type: constants.USER_RECIEVED,
  data: user,
});

export default {
  userRecieved,
};
