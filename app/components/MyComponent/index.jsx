import React, { Component } from 'react';

import './index.css';

class _MyComponent extends Component {
  render() {
    return (
      <h1 className="demo">
        <span className="glyphicon glyphicon-th"></span>
        webpack
        <span className="glyphicon glyphicon-plane"></span>
      </h1>
    );
  }
}

export const MyComponent = _MyComponent;
