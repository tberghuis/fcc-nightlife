import React, { Component } from 'react';

import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        {/*<div className="ui middle aligned center aligned grid">*/}
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;

