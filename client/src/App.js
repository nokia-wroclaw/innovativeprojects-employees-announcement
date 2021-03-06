import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./modules/NavBar";
import Authors from "./modules/authors";
import RegistrationPage from "./modules/RegistrationPage";
import LoginPage from "./modules/LoginPage";
import Page404 from "./modules/Page404";
import HomePage from "./modules/HomePage";
import TopicsPage from "./modules/TopicsPage";
import Footer from "./modules/Footer";
import AccountPage from "./modules/AccountPage";
import AccountView from "./modules/AccountView";
import TopicView from "./modules/TopicView";

import ConfirmPage from "./modules/ConfirmPage";

import ScrollToTop from "./modules/ScrollToTop";

import logo1 from "./modules/images/lightMode.jpg";
import logo2 from "./modules/images/darkMode.jpg";

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./modules/private-route/PrivateRoute";
import Dashboard from "./modules/dashboard/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgImage: props.bgImage
    };
  }

  onChange = event => {
    this.child.onChange(event);
  };

  ChangeToLightMode = e => {
    this.setState({
      bgImage: `url(${logo1})`
    });
    localStorage.logoImage2 = `url(${logo1})`;
  };

  ChangeToDarkMode = e => {
    this.setState({
      bgImage: `url(${logo2})`
    });
    localStorage.logoImage2 = `url(${logo2})`;
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <div
              style={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                backgroundImage: this.state.bgImage,
                height: "100%",
                width: "100%"
              }}
            >
              <Route
                render={({ match, location, history }) => {
                  const showNavFieldsAnn = location.pathname === "/";
                  const showNavFieldsTop = location.pathname === "/topics";
                  return (
                    <NavBar
                      ChangeToDarkMode={this.ChangeToDarkMode}
                      ChangeToLightMode={this.ChangeToLightMode}
                      onChange={this.onChange}
                      showNavFieldsAnn={showNavFieldsAnn}
                      showNavFieldsTop={showNavFieldsTop}
                    />
                  );
                }}
              />

              <div className="App" style={{ flex: 1 }}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <HomePage {...props} onRef={ref => (this.child = ref)} />
                    )}
                  />
                  <Route
                    exact
                    path="/topics"
                    render={props => (
                      <TopicsPage
                        {...props}
                        onRef={ref => (this.child = ref)}
                      />
                    )}
                  />
                  <PrivateRoute
                    exact
                    path="/account-view/:UserEmail"
                    component={AccountView}
                  />

                  <Route exact path="/topics/:TopicId" component={TopicView} />

                  <Route exact path="/authors" component={Authors} />
                  <Route
                    exact
                    path="/registration"
                    component={RegistrationPage}
                  />

                  <Route
                    exact
                    path="/emailconfirmation/:token"
                    component={ConfirmPage}
                  />

                  <Route exact path="/login" component={LoginPage} />
                  <PrivateRoute exact path="/account" component={AccountPage} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <Route path="*" component={Page404} />
                </Switch>
              </div>
            </div>
            <Footer />
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
