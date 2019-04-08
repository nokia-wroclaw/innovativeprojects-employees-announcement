import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import image404 from "./images/404.jpg";

class Page404 extends Component {
  render() {
    return (
      <div>
        <Image src={image404} />
      </div>
    );
  }
}

export default Page404;
