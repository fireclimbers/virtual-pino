import React from "react";

function PianoKey({ note, label, solfege, isBlack, isActive, onClick }) {
  return (
    <div
      className={`piano-key ${isBlack ? "black" : "white"} ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="label">{label}</div>
      <div className="note">{note}</div>
      {solfege && <div className="solfege">{solfege}</div>}
    </div>
  );
}

export default PianoKey;
