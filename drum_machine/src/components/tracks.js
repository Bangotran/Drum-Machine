import React, { Component } from 'react'
import Track from './track'

class Tracks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: [Track, Track, Track, Track],
      playingIndex: 0
    }
  }
  // state of playing here
  // whether each track is playing or not (what index)

  handleClick() {
      this.setState({
        tracks: this.state.tracks.concat(Track)
      })
  }

  render() {

    return (
      <div>
        {this.state.tracks.map((track, i) => React.createElement(track, {key: i, playingIndex: this.state.playingIndex}))}
        <button onClick={this.handleClick.bind(this)}>+</button>
      </div>
    )
  }
}
{/* <Track playingIndex={this.state.playingIndex}/> */}

export default Tracks;
