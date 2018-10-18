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
import NotFound from './pages/NotFound';

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
`;

const Background = styled.div`
  transform: skewY(10deg);
  background-image: linear-gradient(to right, #EF4957 0%, #f9d423 100%);
`;

const UnSkewY = styled.div`
  transform: skewY(-10deg);
`;

class App extends Component {
  componentDidMount() {
    const { checkAuth } = this.props;
    checkAuth();
  }

  renderHome = () => {
    return (
      <Background>
        <UnSkewY>
          <Switch>
            <AnonRoute exact path="/" component={Home} />
            <ProtectedRoute path="/dash" component={Dash} />
            <ProtectedRoute path="/play" component={Play} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </UnSkewY>
      </Background>
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
