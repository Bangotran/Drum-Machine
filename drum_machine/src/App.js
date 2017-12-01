import React, { Component } from 'react';
import Tracks from './components/tracks';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bangin Beats!</h1>
        <Tracks />
      </div>
    );
  }
}

export default App;
