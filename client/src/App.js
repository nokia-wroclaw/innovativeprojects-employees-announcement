import React, { Component } from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import NavBar from './modules/NavBar';
import Authors from './modules/authors';
import RegistrationPage from './modules/RegistrationPage';
import LoginPage from './modules/LoginPage';
import Page404 from './modules/Page404';
import HomePage from './modules/HomePage';
import Footer from './modules/Footer';

import { Provider } from "react-redux";
import store from "./store";


class App extends Component {

  render() {
      return (
        <Provider store={store}>
          <Router>
          <div style={{ display:"flex", minHeight:"100vh", flexDirection:"column" }}>
            <NavBar />
            <div className="App" style={{ flex:1 }}>
              <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/authors" component={Authors} />
              <Route exact path="/registration" component={RegistrationPage} />
              <Route exact path="/login" component={LoginPage}/>
              <Route path="*" component={Page404} />
              </Switch>
            </div>
          </div>
              <Footer />
          </Router>
        </Provider>
    );
  }
}

export default App;
