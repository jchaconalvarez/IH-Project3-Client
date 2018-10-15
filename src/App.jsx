
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AnonRoute from './components/AnonRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dash from './pages/Dash';
import Play from './pages/Play';
import Profile from './pages/Profile';
import styled,{ injectGlobal } from 'styled-components';

injectGlobal`
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
`

const UnSkewY = styled.div`
  transform: skewY(-10deg);

`

class App extends Component {
  render() {
    return (
      <Background>
        <UnSkewY>
          <Switch>
            <AnonRoute exact path="/" component={Home} />
            <ProtectedRoute path="/dash" component={Dash} />
            <ProtectedRoute path="/play" component={Play} />
            <ProtectedRoute path="/profile" component={Profile} />
          </Switch>
        </UnSkewY>
      </Background>
    );
  }
}

export default App;
