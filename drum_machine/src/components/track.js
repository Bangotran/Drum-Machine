import React, { Component } from "react";
import Beat from "./beat";
import { Dropdown } from "semantic-ui-react";
import Tone, { Player } from "tone";

class Track extends Component {
  constructor(props) {
    super(props);
    this.renderBeats = this.renderBeats.bind(this);
  }

  onHandleClick(trackIndex, index) {
    const sample = this.props.sample;
    console.log("sample:" + sample);
    if (sample) {
      let player = new Player(`../audio/${sample}.wav`).toMaster();
      player.autostart = true;
    }
    this.props.clickBeat(trackIndex, index);
    console.log("index" + index);
    console.log("trackindex" + trackIndex);
  }

  renderBeats() {
    return this.props.beats.map((value, i) => {
      return (
        <Beat
          key={i}
          onClick={() => this.onHandleClick(this.props.i, i)}
          active={value}
          isCurrentBeat={i == this.props.currentBeat}
        />
      );
    });
  }

  render() {
    const { sounds } = this.props;
    return (
      <div>
        <Dropdown
          onChange={value => this.props.onChange(value, this.props.i)}
          placeholder="Select a Sample"
          search
          selection
          options={sounds}
        />
        {this.renderBeats()}
        <i
          className="trash outline icon big blue"
          onClick={() => this.props.removeTrack(this.props.i)}
        />
      </div>
    );
  }
}

export default Track;
