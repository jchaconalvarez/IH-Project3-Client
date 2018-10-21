import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../actions/auth';

class NavBar extends Component {

  handleLogOut = () => {
    const { logOut } = this.props;
    logOut();
  }

  render() {
    return (
      <React.Fragment>
        {/* <p>{this.props.user}</p> */}
        <Link to="/play">Play</Link>
        <Link to="/profile">Profile</Link>
        <button type="button" onClick={this.handleLogOut}>Log out</button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    isLogged: state.session.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
