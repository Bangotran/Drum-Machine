import React from 'react'
import tone, {Player} from 'tone'
import samples from './samples.json'

const sounds = samples.map(sample=>require(`../audio/${sample}.wav`));

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


const Track = (props) => {
  return (
      <div>
        <button value="Play">Play

        </button>

      </div>

  )
}

export default Track
