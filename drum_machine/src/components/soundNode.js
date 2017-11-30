import React from 'react'

function SoundNode (props) {
  const style = {
    width: '50px',
    height: '50px',
    backgroundColor: props.color || 'lightgray',
    border: '1px solid black',
    marginRight: "5px"
  }
  return (
    <button className="SoundNode" style={style}></button>
  )
}
export default SoundNode
