import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import AnonRoute from './components/AnonRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dash from './pages/Dash';
import Play from './pages/Play';
import Profile from './pages/Profile';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <AnonRoute exact path="/" component={Home} />
          <ProtectedRoute path="/dash" component={Dash} />
          <ProtectedRoute path="/play" component={Play} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
