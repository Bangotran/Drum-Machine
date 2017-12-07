import React from "react";

function Beat({ onClick, active, i, isCurrentBeat }) {
  let currentBeat;
  let className;
  if (isCurrentBeat) {
    className = "current";
  } else if (active) {
    className = "on";
  } else {
    className = "";
  }

  return <button className={`Beat ${className}`} onClick={onClick} />;
}
export default Beat;
