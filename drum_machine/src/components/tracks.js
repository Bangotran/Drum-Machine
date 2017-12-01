import React, { Component } from 'react'
import Track from './track'

class Tracks extends Component {
  constructor(props) {
    super(props)
    const track = this.newTrack;
    this.state = {
      tracks: [track(),track(),track()],
      playingIndex: 0
    }
    this.removeTrack = this.removeTrack.bind(this)
    this.clickBeat = this.clickBeat.bind(this)
  }
  // state of playing here
  // whether each track is playing or not (what index)

  newTrack () {
    return Array(16).fill(false);
  }

  clickBeat (trackIndex, beatIndex) {
    const tracks = this.state.tracks
    console.log(trackIndex, beatIndex)
    tracks[trackIndex][beatIndex] = !tracks[trackIndex][beatIndex]
    this.setState({
      tracks
    })
  }

  handleClick() {
      this.setState({
        tracks: this.state.tracks.concat([this.newTrack()])
      })
  }

  removeTrack (i) {
    console.log('removed',i)
    this.setState({
      tracks: this.state.tracks.filter(function (element, index) {
        console.log(i, index)
        if (i===index) console.log('removing this one');
        return i != index
      })
    })
  }

  render() {

    return (
      <div>
        {this.state.tracks.map((beats, i) => (
          <Track key={i}
            playingIndex={this.state.playingIndex}
            removeTrack={this.removeTrack} i={i}
            beats={beats} clickBeat={this.clickBeat}
          />))}
        <button onClick={this.handleClick.bind(this)}>+</button>
      </div>
    )
  }
}
{/* <Track playingIndex={this.state.playingIndex}/> */}

export default Tracks;
