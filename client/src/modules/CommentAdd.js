import { addComment } from "../actions/addComment";
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

class CommentAdd extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      topic_id: "",
      user_id: "",
      errors: {},
      messageErrorEmpty: ""
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
      messageErrorEmpty: ""
    };
    if (this.state.message.trim() === "") {
      isError = true;
      errors.messageErrorEmpty = "Message cannot be empty";
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
        message: "",
        errors: {},
        messageErrorEmpty: ""
      });

      const newComment = {
        message: this.state.message,
        topic_id: this.props.topic_id,
        user_id: user.id
      };

      this.props.addComment(newComment, this.props.history);
    }
    this.props.getAllComments();
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
            { marginBottom: "8em" })
          }
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 1168.12 }}>
            <Form size="large" noValidate onSubmit={this.onSubmit}>
              <Segment stacked>
                <span class="errorsColor">{this.state.messageErrorEmpty}</span>
                <TextArea
                  style={{ resize: "none" }}
                  id="message"
                  name="message"
                  fluid
                  icon="write"
                  iconPosition="left"
                  placeholder="Message"
                  error={this.state.messageErrorEmpty}
                  value={this.state.message}
                  onChange={this.onChange}
                />

                <Button
                  style={{ marginTop: "1em" }}
                  color="blue"
                  fluid
                  size="large"
                >
                  Reply
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

CommentAdd.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(withRouter(CommentAdd));
