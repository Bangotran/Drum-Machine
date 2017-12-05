import React, { Component } from 'react'
import Tone, { Transport, Player, Players, Sequence } from 'tone'

import Samples from './samples.json'
import Track from './track'

const sounds = []

Samples.forEach(sample => {
  sounds.push({
    text: sample,
    value: sample
  }
)});


// const Player = new Tone.Transport ()

class Tracks extends Component {
  constructor(props) {
    super(props)
    const track = this.newTrack;
    this.state = {
      tracks: [track()],
      // tracks: [track(),track(),track()],
      loop: this.create([track()])
      // BPM: Tone.Transport.bpm.value = 120
    }
    this.removeTrack = this.removeTrack.bind(this)
    this.clickBeat = this.clickBeat.bind(this)
    this.onChange = this.onChange.bind(this)
    this.loopReducer = this.loopReducer.bind(this)
  }
  // state of playing here
  // whether each track is playing or not (what index)

  //
  newTrack () {
    return {
      sample: 'clap-808',
      beats: Array(16).fill(false)
    }
  }

  // toggleTrack() {
  //
  // }

  loopReducer(tracks) {
    console.log(tracks);
    const urls = tracks.reduce((acc, track) => {
      console.log(track.sample)
      return {...acc, [track.sample]: require(`../audio/${track.sample}.wav`)};
    }, {});
    console.log('urls');
    console.dir(urls);
    const keys = new Tone.Players(
    urls,
    "autostart": true,
    // volume : 1,
    // fadeOut : 0.1,
  ).toMaster();
    console.dir(keys);
    return (time, index) => {
      tracks.forEach(({sample, beats}) => {
        if (beats[index]) {
          // let player = keys.get(sample);
          // player.autostart = true;
          console.log(beats[index])
          console.log(keys)
            keys.get(sample).start(time, 0, "32n", 0)
        }
      });
    };
  }

  update(loop, tracks) {
    loop.callback = this.loopReducer(tracks);
    return loop;
  }

  clickBeat (trackIndex, beatIndex) {
    const tracks = this.state.tracks
    tracks[trackIndex].beats[beatIndex] = !tracks[trackIndex].beats[beatIndex]
    this.setState({
      tracks,
      loop: this.update(this.state.loop, tracks)
    })
  }

  handleClick() {
    this.setState({
      tracks: this.state.tracks.concat([this.newTrack()])
    })
  }

  removeTrack (i) {
    this.setState({
      tracks: this.state.tracks.filter(function (element, index) {
        if (i===index) console.log('removing this one');
        return i != index
      })
    })
  }

  create(tracks){
    const loop = new Tone.Sequence(
      this.loopReducer(tracks),
      new Array(16).fill(0).map((_, i) => i),
      "16n"
    );

    Tone.Transport.bpm.value = 120;
    Tone.Transport.start();
    console.log(loop)
    return loop;
  }

  start = () => {
    this.state.loop.start();
  };

  stop = () => {
    this.state.loop.stop();
  };

    // const sample = this.props.sample;
    // if (sample) {
    //   let player = new Player(require(`../audio/${sample}.wav`)).toMaster();
    //   // // play as soon as the buffer is loaded
    //   player.autostart = true;
    // }

    // Tone.Transport.toggle()
    // let player = new Player(sounds[1].value).toMaster();
    // // play as soon as the buffer is loaded
    // player.autostart = true;


  onChange (event, i) {
    console.dir(event.target);
    let sample = event.target.innerText;
    const tracks = this.state.tracks;
    tracks[i].sample = sample;
    this.setState({ tracks })
  }

  render() {
    return (
      <div>
        <button onClick={this.start}>start</button>
        <button onClick={this.stop}>stop</button>
        {/* <button onClick={this.toggleTrack.bind(this)}>Play</button> */}
        {this.state.tracks.map((track, i) => (
          <Track key={i}
            step={this.state.step}
            removeTrack={this.removeTrack} i={i}
            beats={track.beats} clickBeat={this.clickBeat}
            sample={track.sample}
            sounds={sounds}
            onChange={this.onChange}
          />))}
        <button onClick={this.handleClick.bind(this)}>+</button>
      </div>
    )
  }
}


export default Tracks;
