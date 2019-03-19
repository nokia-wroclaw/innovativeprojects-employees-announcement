import React, { Component } from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Authors from './authors';
import Registration from './Registration';


class App extends Component {

  render() {
      return (
        <Router>
        <div className="App">

          <Route exact path="/authors" component={Authors} />
          <Route exact path="/registration" component={Registration} />
        </div>

        </Router>
    );
  }
}

export default App;
