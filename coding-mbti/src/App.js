import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin/" exact component={SignIn} />
          <Route path="/signup/" exact component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
