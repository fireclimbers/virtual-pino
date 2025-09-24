import React, { useEffect, useState } from "react";
import PianoKey from "./PianoKey";

// Keyboard mapping
// White keys: QWER... ZXCV...
// Black keys: number row + ASDF...
// const keyMap = {
//   // White keys (C major starting at C4)
//   Q: "C4", W: "D4", E: "E4", R: "F4", T: "G4", Y: "A4", U: "B4",
//   Z: "C5", X: "D5", C: "E5", V: "F5", B: "G5", N: "A5", M: "B5",

//   // Black keys
//   2: "C#4", 3: "D#4", 5: "F#4", 6: "G#4", 7: "A#4",
//   A: "C#5", S: "D#5", F: "F#5", G: "G#5", H: "A#5"
// };


const keyMap = {
  // White keys (C major starting at C4)
  Q: "C3", W: "D3", E: "E3", R: "F3", T: "G3", Y: "A3", U: "B3", I: "C4", O: "D4", P: "E4",
  Z: "F4", X: "G4", C: "A4", V: "B4", B: "C5", N: "D5", M: "E5", ',': "F5", '.': "G5", //'/': "A5",

  // Black keys
  2: "Cs3", 3: "Ds3", 5: "Fs3", 6: "Gs3", 7: "As3", 9: "Cs4", 0: "Ds4",
  S: "Fs4", D: "Gs4", F: "As4", H: "Cs5", J: "Ds5", L:"Fs5", //';':"Gs5"
};

// Black key horizontal offsets relative to white keys (in white-key widths)
const BLACK_OFFSETS = {
  "Cs": 0.7,
  "Ds": 1.7,
  "Fs": 3.7,
  "Gs": 4.7,
  "As": 5.7
};

function Piano({ solfegeMap }) {
  const [activeNotes, setActiveNotes] = useState(new Set());

  const playNote = (note) => {
    if (!note) return;
    const audio = new Audio(process.env.PUBLIC_URL + `/sounds/${note}.mp3`);
    audio.play();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const note = keyMap[e.key.toUpperCase()];
      if (!note) return;
      setActiveNotes((prev) => {
        if (prev.has(note)) return prev; // already pressed
        const newSet = new Set(prev);
        newSet.add(note);
        playNote(note);
        return newSet;
      });
    };

    const handleKeyUp = (e) => {
      const note = keyMap[e.key.toUpperCase()];
      if (!note) return;
      setActiveNotes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(note);
        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeNotes]);


  // Separate into white and black keys
  const whiteKeys = Object.entries(keyMap).filter(([, note]) => !note.includes("s"));
  const blackKeys = Object.entries(keyMap).filter(([, note]) => note.includes("s"));

  return (
    <div className="piano">
      <div className="white-keys">
        {whiteKeys.map(([label, note]) => (
          <PianoKey
            key={note}
            note={note}
            label={label}
            solfege={solfegeMap[note]}
            isBlack={false}
            isActive={activeNotes.has(note)}
            onClick={() => playNote(note)}
          />
        ))}
      </div>

      {blackKeys.map(([label, note]) => {
        const root = note.replace(/[0-9]/g, ""); // e.g. "C#"
        const octave = note.match(/[0-9]/)[0];   // e.g. "4"
        const offset = BLACK_OFFSETS[root];
        return (
          <div
            key={note}
            className="black-wrapper"
            style={{ left: `calc(${offset} * 60px + ${(octave - 3) * 7 * 60}px)` }}
          >
            <PianoKey
              note={note}
              label={label}
              solfege={solfegeMap[note]}
              isBlack={true}
              isActive={activeNotes.has(note)}
              onClick={() => playNote(note)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Piano;
