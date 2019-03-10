import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Authors from './authors'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className = "App-title">
            Hello World.
          </h1>
        
        </header>
        <Authors />
      </div>
    );
  }
}

export default App;
