import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import AnonRoute from './components/AnonRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { checkAuth } from './actions/auth';
import Loading from './components/Loading';
import Home from './pages/Home';
import Dash from './pages/Dash';
import Play from './pages/Play';
import Profile from './pages/Profile';
import Lassus from '../src/fonts/Lassus.ttf';
import NotFound from './pages/NotFound';
// import Midi from './services/midi-service';

injectGlobal`
  html {
    font-size: 16px;
  }
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
  }
  a {
    color: inherit;
    text-decoration: none;
    outline: 0;
  }
  button {
    outline: 0;
  }

  @font-face {
    font-family: 'Lassus';
    src: url(${Lassus}) format('truetype');
  }
`;

class App extends Component {
  componentDidMount() {
    const { checkAuth } = this.props;
    checkAuth();
  }

  renderHome = () => {
    return (
      <Switch>
        <AnonRoute exact path="/" component={Home} />
        <ProtectedRoute path="/dash" component={Dash} />
        <ProtectedRoute path="/play" component={Play} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    );
  };

  render() {
    const { status } = this.props;
    return (
      status === 'loading' ? <Loading /> : this.renderHome()
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    status: state.session.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuth()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
