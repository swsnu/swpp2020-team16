import React from 'react';
<<<<<<< HEAD
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Name from './containers/django_fetch_data_container_example/Name';
=======
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Name from './containers/django_fetch_data_container_example/Name';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>
            src/App.js
          </code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
>>>>>>> aa7c69c5bae8d0482df33bfbf7793722e68d1edd

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
