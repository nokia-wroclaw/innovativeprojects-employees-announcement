import React, { Component } from 'react';

import './authors.css';

class Authors extends Component {
  constructor() {
    super();
    this.state = {
      authors: []
    }
  }

componentDidMount(){
  fetch('/api/authors')
    .then(res => res.json())
    .then(authors => this.setState({authors}));
}

  render() {
    return (
      <div>
        <h2>Authors</h2>
        <ul>
        {this.state.authors.map(author =>
          <li key={author.id}>{author.firstName} {author.lastName} </li>
        )}
        </ul>

      </div>
    );
  }
}

export default Authors;
