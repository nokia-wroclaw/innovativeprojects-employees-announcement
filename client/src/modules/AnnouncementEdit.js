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

class EditAnnouncementPage extends Component {
  constructor(props) {
    //const { user } = props.auth;
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
      price: props.price,
      //user_id: user.id,
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
      <div>
        <Grid
          textAlign="center"
          style={
            ({ height: "100%" },
            { marginTop: "5.5em" },
            { marginBottom: "3em" })
          }
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 1168.12 }}>
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment stacked>
                <span class="errorsColor">{this.state.titleErrorEmpty}</span>
                <Form.Input
                  id="title"
                  name="title"
                  fluid
                  icon="quote right"
                  iconPosition="left"
                  placeholder="Title"
                  error={this.state.titleErrorEmpty}
                  value={this.state.title}
                  onChange={this.onChange}
                />

                <span class="errorsColor">{this.state.priceErrorEmpty}</span>
                <div>
                  <span class="errorsColor">
                    {this.state.priceErrorIsNumber}
                  </span>
                </div>
                <Form.Input
                  id="price"
                  name="price"
                  fluid
                  icon="money bill alternate"
                  iconPosition="left"
                  placeholder="Price"
                  error={
                    this.state.priceErrorEmpty || this.state.priceErrorIsNumber
                  }
                  value={this.state.price}
                  onChange={this.onChange}
                />

                <span class="errorsColor">
                  {this.state.descriptionErrorEmpty}
                </span>
                <Form>
                  <TextArea
                    style={{ height: "200px", resize: "none" }}
                    id="description"
                    name="description"
                    fluid
                    icon="pencil alternate"
                    iconPosition="left"
                    placeholder="Description"
                    error={this.state.descriptionErrorEmpty}
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </Form>
                <Button
                  style={{ marginTop: "1em" }}
                  color="blue"
                  fluid
                  size="large"
                >
                  Edit Announcement
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

EditAnnouncementPage.propTypes = {
  addAnnouncement: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default EditAnnouncementPage
