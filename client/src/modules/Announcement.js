import React, { Component } from "react";
import "./Announcement.css";
import { Segment, Feed } from "semantic-ui-react";

export default class Annoucement extends Component {
  state = {
    Author: "Kamil Śliwa",
    Title: "OPEL ASTRA SUPER OKAZJA !!!ONEONE",
    Description:
      "Elo ziomki sprzedam opla warto, tanio, niebity. Ogólnie to sprzedaje, bo nie mam pieniędzy na mój super motocykl marzeń. Mój super motocykl marzeń to skuter dziadka, który chcę od niego odkupić za 30 srebrników kaukaskich. Taka waluta wymaga ode mnie zaangażowania środków pieniężnych, które zostaną pozyskane ze sprzedaży w.w. dóbr materialnych. Elo ziomki sprzedam opla warto, tanio, niebity. Ogólnie to sprzedaje, bo nie mam pieniędzy na mój super motocykl marzeń. Mój super motocykl marzeń to skuter dziadka, który chcę od niego odkupić za 30 srebrników kaukaskich. Taka waluta wymaga ode mnie zaangażowania środków pieniężnych, które zostaną pozyskane ze sprzedaży w.w. dóbr materialnych.  ",
    Date: "10.04.2019"
  };

  render() {
    return (
      <Segment>
        <Feed>
          <Feed.Event>
            <Feed.Label image="/images/avatar/small/laura.jpg" />
            <Feed.Label>
              <a>{this.state.Author}</a>
              <p>{this.state.Description.length}</p>
            </Feed.Label>

            <Feed.Content>
              <Feed.Date>{this.state.Date}</Feed.Date>
              <Feed.Summary>{this.state.Title}</Feed.Summary>
              <Feed.Extra text>{this.state.Description}</Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Segment>
    );
  }
}
