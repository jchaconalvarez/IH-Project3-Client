import React, { Component } from 'react';
import Signup from './Signup';
import Login from './Login';

class Home extends Component {
  state = {
    signup: true,
  }

  switchForm = () => {
    this.setState({ signup: !this.state.signup });
  }

  render() {
    const { signup } = this.state;
    return (
      <div>
        <h1>HOME</h1>
        { signup ? <Signup switchForm={this.switchForm} /> : <Login switchForm={this.switchForm} /> }
      </div>
    );
  }
}

export default Home;
