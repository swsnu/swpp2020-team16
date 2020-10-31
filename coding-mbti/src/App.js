import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';

import './App.css';
import Name from './containers/django_fetch_data_container_example/Name';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/name" exact component={Name} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
