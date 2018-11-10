import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import AnonRoute from './components/AnonRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { checkAuth } from './actions/auth';
import Loading from './components/Loading';
import Home from './pages/Home';
import Dash from './pages/Dash';
import Song from './pages/Song';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import globalStyledComponents from '../src/global-styled-components';

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
        <ProtectedRoute exact path="/song" component={Song} />
        <ProtectedRoute path="/song/:id" component={Song} />
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
