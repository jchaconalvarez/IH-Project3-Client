import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LoadingAnimation from './LoadingAnimation';

const Container = styled.div`
  background: linear-gradient(to top, #313131 0%, #383838 100%);
  height: 100vh;
`;

const Loading = () => {
  return (
    <React.Fragment>
      <Container>
        <LoadingAnimation />
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.session.status,
  };
};

export default connect(mapStateToProps)(Loading);
