import React, { Component } from "react";
import {
  Grid,
  GridRow,
  GridColumn,
  Container,
  Segment
} from "semantic-ui-react";

export default class Annoucement extends Component {
  state = {
    AnnouncementAuthor: "Ukon",
    AnnouncementTitle: "OPEL ASTRA SUPER OKAZJA !!!ONEONE",
    AnnouncementDescription: "Elo ziomki sprzedam opla warto, tanio",
    AnnouncementDate: "10.04.2019"
  };

  schaby = {
    schabik: "schabik"
  };

  render() {
    return (
      <Segment placeholder>
        <Grid columns={3} divided celled>
          <GridRow>
            <GridColumn width={3}>{this.state.AnnouncementAuthor}</GridColumn>
            <GridColumn width={10}>{this.state.AnnouncementTitle}</GridColumn>
            <GridColumn width={3}>{this.state.AnnouncementDate}</GridColumn>
          </GridRow>

          <GridRow centered>
            <GridColumn width={15}>
              <Container text>
                <Segment placeholder>
                  <p border-style="dashed">
                    {this.state.AnnouncementDescription}
                    {"\n"}
                    {this.schaby.schabik}
                  </p>
                </Segment>
              </Container>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn floated="left">Contact me</GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    );
  }
}
