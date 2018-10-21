import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { component: Comp, isLogged, ...rest } = props;
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

const mapStateToProps = (state) => {
  return {
    ...state,
    user: state.session.user,
    isLogged: state.session.isLogged,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
