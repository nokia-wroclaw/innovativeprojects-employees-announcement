import React, { Component } from "react";
import "./AccountPage.css";
import "./RegistrationPage.css";
import {
  Grid,
  Button,
  Header,
  Form,
  Segment,
  Message
} from "semantic-ui-react";


class AccountPage extends Component {
    constructor()
    {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
            phone: "",
        }
    }

    render() {
        return (
            <Header>NO HEJO</Header>
        )
    }

}

export default AccountPage