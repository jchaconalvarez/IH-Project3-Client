import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import AnonRoute from './components/AnonRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dash from './pages/Dash';
import Play from './pages/Play';
import Profile from './pages/Profile';

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

class App extends Component {
  render() {
    return (
      <Switch>
        <AnonRoute exact path="/" component={Home} />
        <ProtectedRoute path="/dash" component={Dash} />
        <AnonRoute path="/play" component={Play} />
        {/* <ProtectedRoute path="/play" component={Play} /> */}
        <ProtectedRoute path="/profile" component={Profile} />
      </Switch>
    );
  }
}

export default App;
