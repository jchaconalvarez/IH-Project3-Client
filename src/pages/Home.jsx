import React from 'react';
import { connect } from 'react-redux';
import { switchForm } from '../actions/ui';
import Signup from '../components/Signup';
import Login from '../components/Login';

const Home = (props) => {
  const { showLogin, switchForm } = props;
  return (
    <div>
      <h1>HOME</h1>
      {
        showLogin
          ? <Login showLogin={showLogin} switchForm={switchForm} />
          : <Signup showLogin={showLogin} switchForm={switchForm} />
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showLogin: state.ui.showLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchForm: () => dispatch(switchForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
