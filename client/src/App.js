import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './modules/NavBar';
import Authors from './modules/authors';
import Registration from './modules/Registration';
import Login from './modules/Login';
import Path404 from './modules/Path404';
import HomePage from './modules/HomePage';
import Footer from './modules/Footer';



class App extends Component {

  render() {
      return (
        <Router>
        <div style={{ display:"flex", minHeight:"100vh", flexDirection:"column" }}>
          <NavBar />
          <div className="App" style={{ flex:1 }}>
            <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" component={Login}/>
            <Route path="*" component={Path404} />
            </Switch>
          </div>
        </div>
            <Footer />


        </Router>
    );
  }
}

export default App;
