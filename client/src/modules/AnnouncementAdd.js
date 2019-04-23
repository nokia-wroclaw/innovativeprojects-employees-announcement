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

class AddAnnouncementPage extends Component {
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
      user_idErrorEmpty: ""
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
      user_idErrorEmpty: ""
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

    if (this.state.user_id.trim() === "") {
      isError = true;
      errors.user_idErrorEmpty = "user_id cannot be empty";
    }

    if (isError) {
      this.setState(errors);
    }

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();

    const err = this.validate();

    if (!err) {
      this.setState({
        //    title: "",
        //      description: "",
        //      price: "",
        //      user_id: "",
        errors: {},
        titleErrorEmpty: "",
        descriptionErrorEmpty: "",
        priceErrorEmpty: "",
        user_idErrorEmpty: ""
      });

      const newAnnouncement = {
        title: this.state.title,
        description: this.state.description,
        price: this.state.price,
        user_id: this.state.user_id
      };

      this.props.addAnnouncement(newAnnouncement, this.props.history);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Grid
          textAlign="center"
          style={({ height: "100%" }, { marginTop: "5.5em" })}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              Adding announcement
            </Header>
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
                  <span class="errorsColor">{this.state.priceErrorDomain}</span>
                </div>
                <Form.Input
                  id="price"
                  name="price"
                  fluid
                  icon="money bill alternate"
                  iconPosition="left"
                  placeholder="Price"
                  error={this.state.priceErrorEmpty}
                  value={this.state.price}
                  onChange={this.onChange}
                />

                <span class="errorsColor">
                  {this.state.descriptionErrorEmpty}
                </span>
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

                <span class="errorsColor">{this.state.user_idErrorEmpty}</span>

                <Form.Input
                  id="user_id"
                  name="user_id"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="user_id"
                  type="user_id"
                  error={this.state.user_idErrorEmpty}
                  value={this.state.user_id}
                  onChange={this.onChange}
                />

                <Button color="blue" fluid size="large">
                  Add
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

AddAnnouncementPage.propTypes = {
  addAnnouncement: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addAnnouncement }
)(withRouter(AddAnnouncementPage));
