import React from 'react';
import { connect } from 'react-redux';
import LoadingAnimation from './LoadingAnimation';

const Loading = () => {
  return (
    <React.Fragment>
      <h1>Loading</h1>
      <LoadingAnimation />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.session.status,
  };
};

export default connect(mapStateToProps)(Loading);
