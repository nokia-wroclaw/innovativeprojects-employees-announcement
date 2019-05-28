import { addTopic } from "../actions/addTopic";
import React, { Component } from "react";

import { Grid, Button, Form, Segment, TextArea } from "semantic-ui-react";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class AddTopicPage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      user_id: "",
      errors: {},
      titleErrorEmpty: "",
      descriptionErrorEmpty: ""
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
      descriptionErrorEmpty: ""
    };
    if (this.state.title.trim() === "") {
      isError = true;
      errors.titleErrorEmpty = "Title cannot be empty";
    }

    if (this.state.description.trim() === "") {
      isError = true;
      errors.descriptionErrorEmpty = "Description cannot be empty";
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
        user_id: "",
        errors: {},
        titleErrorEmpty: "",
        descriptionErrorEmpty: ""
      });

      const newTopic = {
        title: this.state.title,
        description: this.state.description,
        user_id: user.id
      };
      let self = this;
      this.props.addTopic(newTopic, this.props.history).then(function() {
        return self.props.getAllTopics();
      });
    }
  };

  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={
            ({ height: "100%" },
            { marginTop: "5.5em" },
            { marginBottom: "8em" })
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
                  Add Topic
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

AddTopicPage.propTypes = {
  addTopic: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTopic }
)(withRouter(AddTopicPage));
