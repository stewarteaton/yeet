import React, {Component} from 'react';

export class EditProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static navigationOptions = {
    title: 'Edit Profile',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return <div />;
  }
}

export default EditProfile;
