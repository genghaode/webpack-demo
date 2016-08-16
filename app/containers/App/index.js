import React, { Component } from 'react';
import { MyComponent } from 'components';

import './index.css';

class _App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MyComponent />
        <p>
          hello world
        </p>
      </div>
    );
  }
}

export const App = _App;
