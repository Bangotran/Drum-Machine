import React from 'react'

function Beat ({ onClick, active, i }) {
  let currentBeat;
  const className = `Beat ${active ? "on" : Beat[i] === currentBeat ?
  'current' : ''}`
  return (
    <button className={className} onClick={onClick} >
    </button>
  )
}
export default Beat


// Beat[i] === currentBeat ? 'current' :
