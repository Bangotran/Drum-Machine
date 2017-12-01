import React, { Component } from 'react'
import Tone, { Transport, Player} from 'tone'
import Samples from './samples.json'
import Beat from './beat'

const sounds = Samples.map(sample=>require(`../audio/${sample}.wav`));

console.log(sounds);
// let player = new Player(sounds[21]).toMaster();
//play as soon as the buffer is loaded
// player.autostart = true;

// const p = new Player({
// 	"url" : "../audio/kick-808.wav",
// 	"autostart" : true,
// }).toMaster();


class Track extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beats: Array(16).fill(false),
      // tone ---> sample
    }
  }

  onHandleClick(index) {
    let beats = this.state.beats;
    beats[index] = !beats[index];
    this.setState({
      beats
    })
  }

  renderBeats () {
    return this.state.beats.map((value, i) => (<Beat key={i} onClick={() => this.onHandleClick(i)} active={value} />))
  }

  removeTrack () {
    console.log('removed')
    return
  }

  render() {
    return(
      <div>
        {/* render instrument dropdown here */}
        {this.renderBeats()}
        <button onClick={this.removeTrack.bind(this)}>-</button>
      </div>
    )
  }
}

export default Track
