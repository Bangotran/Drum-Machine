import React from 'react'

function Beat ({ onClick, active }) {
  const className = `Beat ${active ? 'on' : ''}`
  return (
    <button className={className} onClick={onClick}>
    </button>
  )
}
export default Beat
