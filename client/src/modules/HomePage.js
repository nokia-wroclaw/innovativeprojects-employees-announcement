import React, { Component } from 'react';
import {Image} from 'semantic-ui-react';
import logo2 from './images/one.jpg';




class HomePage extends Component {


  render() {
    return (

      <div>
      <Image src={logo2}  />
      </div>

    );
  }
}

export default HomePage;
