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
    constructor(props)
        {
            super(props)
        }

    render() {
        const { user } = this.props.auth;
          if (this.props.auth.isAuthenticated )
         {
        return (
            <div>
                <AccountSettings/>
                <h1>{user.lastName}</h1>
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