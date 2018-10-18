import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from '../actions/auth';

class ProtectedRoute extends Component {
  render() {
    const { component: Comp, isLogged, ...rest } = this.props;
    console.log('PROTECTED:', isLogged);
    return (
      <Route
        {...rest}
        render={(props) => {
          if (isLogged) {
            return <Comp {...props} />;
          }
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    user: state.session.user,
    isLogged: state.session.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
