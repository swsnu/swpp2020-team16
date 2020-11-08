import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './containers/Home';
import Result from './containers/Result';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/results" exact component={Result} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
