import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from '../actions/auth';

class AnonRoute extends Component {
  componentDidMount() {
    checkAuth();
  }

  render() {
    const { component: Comp, isLogged, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          if (!isLogged) {
            return <Comp {...props} />;
          }
          return <Redirect to={{ pathname: '/dash', state: { from: props.location } }} />;
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.session.isLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => dispatch(checkAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnonRoute);