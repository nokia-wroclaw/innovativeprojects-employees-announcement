import { addAnnouncement } from "../actions/addAnn";
import React, { Component } from "react";

import {
  Grid,
  Button,
  Header,
  Form,
  Segment,
  TextArea
} from "semantic-ui-react";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EditAnnouncement extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      price: "",
      user_id: "",
      errors: {},
      titleErrorEmpty: "",
      descriptionErrorEmpty: "",
      priceErrorEmpty: "",
      priceErrorIsNumber: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  validate = () => {
    let isError = false;
    const errors = {
      titleErrorEmpty: "",
      descriptionErrorEmpty: "",
      priceErrorEmpty: "",
      priceErrorIsNumber: ""
    };
    if (this.state.title.trim() === "") {
      isError = true;
      errors.titleErrorEmpty = "Title cannot be empty";
    }

    if (this.state.description.trim() === "") {
      isError = true;
      errors.descriptionErrorEmpty = "Description cannot be empty";
    }

    if (this.state.price.trim() === "") {
      isError = true;
      errors.priceErrorEmpty = "Price cannot be empty";
    }

    if (isNaN(this.state.price)) {
      isError = true;
      errors.priceErrorIsNumber = "Price needs to be a number";
    }

    if (isError) {
      this.setState(errors);
    }

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const err = this.validate();

    if (!err) {
      this.setState({
        title: "",
        description: "",
        price: "",
        user_id: "",
        errors: {},
        titleErrorEmpty: "",
        descriptionErrorEmpty: "",
        priceErrorEmpty: "",
        priceErrorIsNumber: ""
      });

      const newAnnouncement = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        user_id: user.id
      };

      this.props.addAnnouncement(newAnnouncement, this.props.history);
    }
    this.props.getAllAnnouncements();
  };

  render() {
    const { errors } = this.state;
    return (
     <AnnouncementAdd />
    );
  }
}

EditAnnouncement.propTypes = {
  addAnnouncement: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default EditAnnouncement
