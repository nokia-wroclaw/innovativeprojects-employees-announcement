import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Authors from './authors'


class App extends Component {
state = {
  showData: false
}

handleClick = () => {
   this.setState({
     showData: true
   });
 }

  render() {

    const { showData } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className = "App-title">
            Hello World :)
          </h1>

        </header>
        <button onClick={this.handleClick}>Click me to show the authors</button>
        { showData && <Authors />}

      </div>
    );
  }
}

export default App;
