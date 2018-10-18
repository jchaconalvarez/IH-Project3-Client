import React from 'react';
import { connect } from 'react-redux';

const Loading = () => {
  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.session.status,
  };
};

export default connect(mapStateToProps)(Loading);
