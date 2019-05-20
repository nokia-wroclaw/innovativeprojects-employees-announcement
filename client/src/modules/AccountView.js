import React, { Component } from "react";
import axios from "axios";

import {
  List,
  Form,
  Header,
  Grid,
  GridRow,
  Segment,
  Icon,
  GridColumn
} from "semantic-ui-react";
import FileBase from "react-file-base64";
import DefaultImg from "./images/default-img.jpg";

class AccountView extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, baseImage: DefaultImg };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    axios
      .get(`/api/users/acc/${params.UserEmail}@nokia.com`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getBaseFile(files) {
    // create a local readable base64 instance of an image
    this.setState({
      baseImage: files.base64
    });

    let imageObj = {
      image: files.base64.toString()
    };

    axios
      .post(`/api/users/update/photo/${this.state.user._id}`, imageObj)
      .then(data => {
        alert("Image has been successfully uploaded ");
      })
      .catch(err => {
        alert("Error while uploading image using base64 format");
      });
  }

  render() {
    return (
      <div>
        <Grid textAlign="center" style={{ marginTop: "5.5em" }}>
          <GridRow>
            <Form noValidate onSubmit={this.onSubmit}>
              <Segment style={{ height: "200px", width: "600px" }}>
                <Header as="h1">User info</Header>
                <Grid columns="3">
                  <GridColumn width="1">
                    <List size="massive">
                      <List.Item icon="user" />
                      <List.Item icon="user" />
                      <List.Item icon="mail" />
                    </List>
                  </GridColumn>
                  <GridColumn textAlign="left">
                    <List size="massive">
                      <List.Item content={"First Name: "} />
                      <List.Item content={"Last Name: "} />
                      <List.Item content={"Email: "} />
                    </List>
                  </GridColumn>
                  <GridColumn textAlign="left">
                    <List size="massive">
                      <List.Item content={this.state.user.firstName} />
                      <List.Item content={this.state.user.lastName} />
                      <List.Item content={this.state.user.email} />
                    </List>
                  </GridColumn>
                </Grid>
              </Segment>
            </Form>
          </GridRow>

          {/* <GridRow>
            <Form noValidate onSubmit={this.onSubmit}>
              <Segment stacked style={{ height: "400px", width: "800px" }} />
            </Form>
          </GridRow> */}
        </Grid>
        <div className="process">
          <div className="process__upload-btn">
            <FileBase
              type="file"
              multiple={false}
              onDone={this.getBaseFile.bind(this)}
            />
          </div>
          <img
            src={this.state.baseImage}
            alt="upload-image"
            className="process__image"
          />
        </div>
      </div>
    );
  }
}

export default AccountView;
