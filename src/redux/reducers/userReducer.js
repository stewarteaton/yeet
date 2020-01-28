import constants from '../constants';

var initialState = {
  id: '',
  email: '',
  userName: 'Pegasus',
  bio: 'Hello, my name is Pegasus',
  isMale: false,
  profilePictures: [
    {url: 'https://images.unsplash.com/photo-1543668900-9124915a121f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', order: '1'}, 
    {url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', order: '2'}, 
    {url: 'https://images.unsplash.com/photo-1556973888-178d32cfca32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', order: '3'},
    {url: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', order: '4'},
    {url: 'https://images.unsplash.com/photo-1568693059993-a239b9cd4957?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', order: '5'},
    {url: '', order: '9'},
  ],
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
