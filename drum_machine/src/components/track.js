import React, { Component } from 'react'
import Tone, { Transport, Player} from 'tone'
import Samples from './samples.json'
import SoundNode from './soundNode'

const sounds = Samples.map(sample=>require(`../audio/${sample}.wav`));

// let synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");

//start the note "D3" one second from now
// synth.triggerAttack("D3", "+1");

console.log(sounds);
let player = new Player(sounds[21]).toMaster();
//play as soon as the buffer is loaded
player.autostart = true;


// const p = new Player({
// 	"url" : "../audio/kick-808.wav",
// 	"autostart" : true,
// }).toMaster();
function createTrack(color) {
  let steps = []
  for (let i = 0; i < 16; i++) {
    steps.push(false)
  }
  return { steps: steps, color: color}
}

class Track extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    return(
      <div>
        <SoundNode />
      </div>
    )
  }
}

export default Track
