import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../actions/auth';

const NavbarItem = styled(Link)`
  color: #FFF;
  font-size: 1rem;
`;

const NavBarBtn = styled.div`
  color: #FFF;
  font-size: 1rem;
  outline: none;
`;

const NavbarContainer = styled.div`
  background: rgba(0,0,0,.2);
  display: grid;
  grid-column: 1 / -1;
  grid-row: 1;
  grid-template-columns: repeat(3, 6rem);
  justify-items: center;
  justify-content: end;
  padding: 1rem;
  font-family: 'Raleway', sans-serif;
`;

class NavBar extends Component {

  handleLogOut = () => {
    const { logOut } = this.props;
    logOut();
  }

  render() {
    return (
      <NavbarContainer>
        {/* <p>{this.props.user}</p> */}
        <NavbarItem to="/play">Play</NavbarItem>
        <NavbarItem to="/profile">Profile</NavbarItem>
        <NavBarBtn type="button" onClick={this.handleLogOut}>Log out</NavBarBtn>
      </NavbarContainer>
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
