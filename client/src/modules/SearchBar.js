import React, { Component } from "react";
import { Input, Menu, Sticky } from "semantic-ui-react";

export default class SearchBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Sticky>
        <Menu vertical>
          <Menu.Item>
            <Input placeholder="Search..." />
          </Menu.Item>

          <Menu.Item>
            Home
            <Menu.Menu>
              <Menu.Item
                name="search"
                active={activeItem === "search"}
                onClick={this.handleItemClick}
              >
                Search
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </Sticky>
    );
  }
}
