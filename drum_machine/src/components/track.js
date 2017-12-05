import React, { Component } from 'react'
import Beat from './beat'
import { Dropdown } from 'semantic-ui-react'
import Tone, { Player } from 'tone'

class Track extends Component {
  constructor(props) {
    super(props)
    this.renderBeats = this.renderBeats.bind(this)
  }

  onHandleClick(trackIndex, index) {
    const sample = this.props.sample;
    if (sample) {
      let player = new Player(require(`../audio/${sample}.wav`)).toMaster();
      // // play as soon as the buffer is loaded
      player.autostart = true;
    }
    this.props.clickBeat(trackIndex,index)
  }

  renderBeats () {
    return this.props.beats.map((value, i) => (<Beat key={i} onClick={() => this.onHandleClick(this.props.i, i)} active={value} />))
  }

  render() {
    const { sounds } = this.props;
    return(
      <div>
        <Dropdown onChange={value => this.props.onChange(value, this.props.i)} placeholder='Select a Sample' search selection options={sounds} />
        {this.renderBeats()}
        <i className="trash outline icon big blue" onClick={() =>this.props.removeTrack(this.props.i)}></i>
      </div>
    )
  }
}

export default Track
