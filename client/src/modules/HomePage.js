import React, { Component } from "react";
import logo2 from "./images/one.jpg";

class HomePage extends Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${logo2})`,
          height: "100%",
          width: "100%"
        }}
      />
    );
  }
}

export default HomePage;