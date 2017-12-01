import React, { Component } from 'react'
import Tone, { Transport, Player} from 'tone'
import Samples from './samples.json'
import Beat from './beat'

const sounds = {}
Samples.forEach(sample=>{sounds[sample] = require(`../audio/${sample}.wav`)});

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
    this.renderBeats = this.renderBeats.bind(this)
  }

  onHandleClick(trackIndex, index) {
    this.props.clickBeat(trackIndex,index)
  }

  renderBeats () {
    return this.props.beats.map((value, i) => (<Beat key={i} onClick={() => this.onHandleClick(this.props.i, i)} active={value} />))
  }

  render() {
    return(
      <div>
        {/* render instrument dropdown here */}
        {this.renderBeats()}
        <button onClick={() =>this.props.removeTrack(this.props.i)}>-</button>
      </div>
    )
  }
}

export default Track
