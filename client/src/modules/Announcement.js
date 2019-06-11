import React, { Component } from "react";

import {
  Button,
  Segment,
  Input,
  TextArea,
  Feed,
  Form,
  Confirm
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import ReactTimeAgo from "react-time-ago/tooltip";

import "react-time-ago/Tooltip.css";

import axios from "axios";

import "./Announcement.css";

class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isEditClicked: false,
      title: this.props.announcement.title,
      price: this.props.announcement.price,
      description: this.props.announcement.description,
      errors: {},
      titleErrorEmpty: "",
      descriptionErrorEmpty: "",
      priceErrorEmpty: "",
      priceErrorIsNumber: "",
      open: false
    };
  }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  componentDidMount() {
    axios
      .get(`/api/users/${this.props.announcement.user_id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

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

    if (this.state.price.toString().trim() === "") {
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

  EditIsClicked() {
    this.setState({ isEditClicked: !this.state.isEditClicked });

    axios
      .get(`/api/announcements/${this.props.announcement._id}`)
      .then(response => {
        this.setState({
          description: response.data.description,
          title: response.data.title,
          price: response.data.price
        });
      })
      .catch(err => {
        alert("Error while getting announcement");
      });
  }

  EditIsSend = e => {
    const err = this.validate();

    if (!err) {
      let updObj = {
        description: this.state.description,
        title: this.state.title,
        price: this.state.price
      };

      axios
        .post(
          `/api/announcements/update/${this.props.announcement._id}`,
          updObj
        )
        .then(data => {
          alert("Announcement has been successfully updated ");
          this.setState({ isEditClicked: false });
        })
        .catch(err => {
          alert(
            "Error while updating announcement - blank fields or wrong format"
          );
        });
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  ButtonDelete = e => {
    this.close();

    axios
      .post(`/api/announcements/delete/${this.props.announcement._id}`)
      .then(data => {
        alert("Announcement has been successfully deleted");
        this.props.getAllAnnouncements();
      })
      .catch(err => {
        alert("Error while deleting announcement");
      });
  };

  render() {
    const { user } = this.props.auth;
    var acc = new String(this.state.user.email);
    //  acc = acc.substring(0, acc.indexOf("@"));
    //    var date =
    //    new Date(this.props.announcement.date_of_add).toLocaleTimeString() +
    //      ", " +
    //      new Date(this.props.announcement.date_of_add).toLocaleDateString();

    var date = new Date(this.props.announcement.date_of_add);

    return (
      <Segment style={{ width: "100%" }}>
        {user.id === this.state.user._id ? (
          <>
            <>
              <Button floated="right" onClick={this.open}>
                Delete
              </Button>
              <Confirm
                open={this.state.open}
                onCancel={this.close}
                onConfirm={this.ButtonDelete}
              />
            </>
            <Button floated="right" onClick={() => this.EditIsClicked()}>
              {" "}
              Edit{" "}
            </Button>
          </>
        ) : (
          ""
        )}

        {this.state.isEditClicked ? (
          <>
            <Form size="large" noValidate onSubmit={this.EditIsSend}>
              <Feed style={{ marginTop: "1.5em" }}>
                <Feed.Event>
                  <Feed.Label>
                    <img src={this.state.user.image} alt="avatar" />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Date>
                      Added by {this.state.user.firstName}{" "}
                      {this.state.user.lastName}{" "}
                      <Link to={"/account-view/" + acc}>
                        {this.state.user.email}
                      </Link>{" "}
                      <ReactTimeAgo
                        date={date}
                        tooltipClassName="TooltipCssAnnouncement"
                      />
                    </Feed.Date>
                    <div>
                      <span class="errorsColor">
                        {this.state.titleErrorEmpty}
                      </span>
                    </div>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={this.props.announcement.title}
                      value={this.state.title}
                      onChange={this.onChange}
                      style={{ width: "50vw" }}
                    />
                    <div>
                      <span class="errorsColor">
                        {this.state.priceErrorEmpty}
                      </span>
                    </div>
                    <div>
                      <span class="errorsColor">
                        {this.state.priceErrorIsNumber}
                      </span>
                    </div>
                    <Input
                      id="price"
                      name="price"
                      defaultValue={this.props.announcement.price}
                      value={this.state.price}
                      onChange={this.onChange}
                      style={{ width: "50vw" }}
                    />
                    <div>
                      <span class="errorsColor">
                        {this.state.descriptionErrorEmpty}
                      </span>
                    </div>
                    <TextArea
                      id="description"
                      name="description"
                      style={{ width: "50vw", resize: "none" }}
                      defaultValue={this.state.description}
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                  </Feed.Content>
                </Feed.Event>
              </Feed>
              <Button>Apply </Button>
            </Form>
          </>
        ) : (
          <Feed style={{ marginTop: "1.5em" }}>
            <Feed.Event>
              <Feed.Label>
                <img src={this.state.user.image} alt="avatar" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Date>
                  Added by {this.state.user.firstName}{" "}
                  {this.state.user.lastName}{" "}
                  <Link to={"/account-view/" + acc}>
                    {this.state.user.email}
                  </Link>{" "}
                  <ReactTimeAgo
                    date={date}
                    tooltipClassName="TooltipCssAnnouncement"
                  />
                </Feed.Date>
                <Feed.Summary style={{ fontSize: "2vh" }}>
                  <div>{this.state.title}</div>
                </Feed.Summary>
                <Feed.Extra text>
                  <p>
                    <div>
                      <b>Price: </b> {this.state.price}
                      [zł]
                    </div>
                  </p>
                </Feed.Extra>
                <Feed.Extra style={{ width: "90%" }}>
                  <div>{this.state.description}</div>
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        )}
      </Segment>
    );
  }
}

Announcement.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Announcement);
