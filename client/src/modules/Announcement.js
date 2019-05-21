import React, { Component } from "react";

import {
  Grid,
  GridRow,
  Menu,
  Sticky,
  Segment,
  Rail,
  GridColumn,
  Feed,
  Button,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

import axios from "axios";
import AnnouncementAdd from "./AnnouncementAdd";
import AnnouncementEdit from "./AnnouncementEdit";


class Announcement extends Component {
  constructor(props) {
 
    super(props);

    this.state = { 
      user: {},
      auth: this.props.auth,
      isEdited: false
    };

  }

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

  render() {
    var acc = new String(this.state.user.email);
    acc = acc.substring(0, acc.indexOf("@"));
    var date =
      new Date(this.props.announcement.date_of_add).toLocaleTimeString() +
      ", " +
      new Date(this.props.announcement.date_of_add).toLocaleDateString();
    console.log(this.state.isEdited)
    if(!this.state.isEdited)
    return (
      <Segment>
        <Feed>
            <Feed.Event>
                <Feed.Label /*image="./images/nokia.png" */ />
                <Feed.Content>
                  <Grid columns="2">
                    <Grid.Column>
                      <Feed.Date>
                        Added by {this.state.user.firstName} {this.state.user.lastName}{" "}
                        <Link to={"/account-view/" + acc}>{this.state.user.email}</Link>{" "}
                        at {date}
                      </Feed.Date>
                      <Feed.Summary style={{ fontSize: "20px" }}>
                        {" "}
                        {this.props.announcement.title}
                      </Feed.Summary>
                      <Feed.Extra text>
                        <p>
                          <b>Price: </b> {this.props.announcement.price} [zł]
                        </p>
                      </Feed.Extra>
                    </Grid.Column>
                      {this.state.user._id == this.props.auth.user.id ? (
                        <Grid.Column>
                          <Button floated="right" onClick = {(e) =>
                            {e.preventDefault()
                              this.setState({isEdited: true})}}>
                              EDIT
                          </Button>
                        </Grid.Column>
                    ) : (
                      ""
                    )}
                       </Grid>
                      <Feed.Extra style={{ width: "90%" }}>
                        {this.props.announcement.description}
                      </Feed.Extra>
               
                </Feed.Content>
            </Feed.Event>
        </Feed>
      </Segment>)
      else
      return (
        <div>
        <Segment style={{backgroundColor: "#0d71bb"}}>
          <Header size="small" color="white">Announcement Edition</Header>
        </Segment>
        <AnnouncementEdit {...this.props.announcement} {...this.state.user}/>
        </div>
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
