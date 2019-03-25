import React, { Component } from 'react';
import {Image, List, Segment, Container } from 'semantic-ui-react';
import logo from './images/nokia.png';

class Footer extends Component {


  render() {
    return (

<div >

            <Segment inverted attached>
                <Container textAlign='center'>
          <Image centered size='mini' src={logo} />
          <List horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
              Placeholder
            </List.Item>
            <List.Item as='a' href='#'>
              Placeholder
            </List.Item>
            <List.Item as='a' href='#'>
              Placeholder
            </List.Item>
            <List.Item as='a' href='#'>
              Placeholder
            </List.Item>
          </List>
          </Container>
        </Segment>

</div>


    );
  }
}

export default Footer;
