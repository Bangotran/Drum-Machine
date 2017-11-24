import React, { Component } from 'react';
import Tracks from './components/tracks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Drum Machine</h1>
        <Tracks />
      </div>
    );
  }
}

export default App;
