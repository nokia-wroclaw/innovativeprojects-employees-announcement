import AccountSettings from "./AccountSettings";
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
            <div>
                <AccountSettings 
                firstName = {user.firstName}
                lastName = {user.lastName}
                />
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