import React, { Component } from 'react';
import Tone from 'tone';
import Samples from './samples.json';
import Track from './track';

const sounds = [];

Samples.forEach(sample => {
  sounds.push({
    text: sample,
    value: sample,
  });
});

class Tracks extends Component {
  constructor(props) {
    super(props);
    const track = this.newTrack;
    this.state = {
      tracks: [track(), track(), track(), track()],
      loop: this.create([track()], this.updateCurrentBeat()),
      currentBeat: -1,
      bpm: 120,
    };
    this.removeTrack = this.removeTrack.bind(this);
    this.clickBeat = this.clickBeat.bind(this);
    this.onChange = this.onChange.bind(this);
    this.loopReducer = this.loopReducer.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
  }
  // state of playing here
  // whether each track is playing or not (what index)

  newTrack() {
    return {
      sample: 'kick-808',
      beats: Array(16).fill(false),
    };
  }

  loopReducer(tracks, tempo) {
    // console.log(tracks);
    const urls = tracks.reduce((acc, track) => {
      // console.log(track.sample)
      return {
        ...acc,
        [track.sample]: (`../audio/${track.sample}.wav`),
      };
    }, {});
    // console.log('urls');
    // console.dir(urls);
    const keys = new Tone.Players(urls, ('autostart': true)).toMaster();
    // console.dir(keys);
    return (time, index) => {
      tracks.forEach(({ sample, beats }) => {
        if (beats[index]) {
          // console.log(beats[index])
          // console.log(keys)
          keys.get(sample).start(time, 0, '8n', 0);
        }
      });
    };
  }

  update(loop, tracks, tempo) {
    loop.callback = this.loopReducer(tracks, tempo);
    return loop;
  }

  clickBeat(trackIndex, beatIndex) {
    const tracks = this.state.tracks;
    tracks[trackIndex].beats[beatIndex] = !tracks[trackIndex].beats[beatIndex];
    this.setState({
      tracks,
      loop: this.update(this.state.loop, tracks),
    });
  }

  handleClick() {
    this.setState({
      tracks: this.state.tracks.concat([this.newTrack()]),
    });
  }

  removeTrack(i) {
    this.setState({
      tracks: this.state.tracks.filter(function(element, index) {
        if (i === index) console.log('removing this one');
        return i != index;
      }),
    });
  }

  create(tracks) {
    const loop = new Tone.Sequence(
      this.loopReducer(tracks),
      new Array(16).fill(false).map((_, beat) => beat),
      '16n'
    );

    Tone.Transport.bpm.value = 120;
    Tone.Transport.start();
    // console.log(loop)
    return loop;
  }

  updateBPM = bpm => {
    Tone.Transport.bpm.value = bpm;
  };

  updateCurrentBeat = () => {
    this.setState({currentBeat: this.beat})
    console.log(this.beat)
  }

  start = () => {
    this.state.loop.start();
    console.log(this.state.currentBeat)
  };

  stop = () => {
    this.state.loop.stop();
    this.setState({currentBeat: -1})
    console.log(this.state.currentBeat)
  };

  onChange(event, i) {
    // console.dir(event.target);
    let sample = event.target.innerText;
    const tracks = this.state.tracks;
    tracks[i].sample = sample;
    this.setState({ tracks });
  }

  handleBPMChange(ev) {
    this.setState({
      bpm: ev.target.value,
    });
    // console.log(ev.target.value);
    this.updateBPM(ev.target.value);
  }

  render() {
    return (
      <div>
        <div className="controls">
          <button
            className="small ui inverted blue icon button"
            onClick={this.start}
          >
            <i className="large blue play icon" />
          </button>
          <button
            className="small ui inverted blue icon button"
            onClick={this.stop}
          >
            <i className="large stop circle icon" />
          </button>
          <span className="Bpm">BPM</span>

          <input className="BpmSlider" type="range" min="60" max="200" onChange={this.handleBPMChange} value={this.state.bpm} />
          <input className="BpmText" value={this.state.bpm} onChange={this.handleBPMChange} />
          <br />
        </div>
        <hr className="divider" />

        {this.state.tracks.map((track, i) =>
          <Track
            key={i}
            currentBeat={this.currentBeat}
            removeTrack={this.removeTrack}
            i={i}
            beats={track.beats}
            clickBeat={this.clickBeat}
            sample={track.sample}
            sounds={sounds}
            onChange={this.onChange}
          />
        )}
        <br />
        <button
          className="ui inverted blue button"
          onClick={this.handleClick.bind(this)}
        >
          Add Track +
        </button>
      </div>
    );
  }
}

export default Tracks;
