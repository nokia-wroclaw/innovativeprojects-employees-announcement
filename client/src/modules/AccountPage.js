import {NameSettings, PasswordSettings, ContactSettings} from "./AccountSettings";
import React, { Component } from "react";
import {
  Grid,
  Button,
  Header,
  Form,
  Segment,
  Message
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Page404 from "./Page404";

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
 
          if (this.props.auth.isAuthenticated )
             { 
            const { user } = this.props.auth;
            return (
                     <div className = "accountpage-form" style={{ marginTop: "5em" }}>
                        <Grid textAlign="center" verticalAlign="middle">
                             <Grid.Column style={{ maxWidth: 600 }} right aligned>
                                 <Message>
                                    <Header as="h3" color="blue" textAlign="center">
                                        Account Details
                                    </Header>
                                 </Message>

                                <NameSettings
                                firstName = {user.firstName}
                                lastName = {user.lastName}
                                />

                                <PasswordSettings/>
                                <ContactSettings/>

                        
                             </Grid.Column>
                         </Grid>
                 </div>
                    )
                 }
             else
         {
             return (
                 <Page404/>
             )
         }
    }
}

AccountPage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps,
    { logoutUser }
  )(AccountPage);