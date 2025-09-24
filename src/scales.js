// Build scale → solfege mapping
// Default C major solfege: C=Do, D=Re, E=Mi, F=Fa, G=Sol, A=La, B=Ti
// Shift depending on key & mode

const NOTES = ["C","Cs","D","Ds","E","F","Fs","G","Gs","A","As","B"];
const SOLFEGE_MAJOR = ["Do","Re","Mi","Fa","Sol","La","Ti"];

function noteIndex(note) {
  return NOTES.indexOf(note.replace(/[0-9]/g,""));
}

function buildScale(root, intervals) {
  const idx = noteIndex(root);
  return intervals.map((i) => NOTES[(idx + i) % 12]);
}

const SCALE_INTERVALS = {
  major:       [0,2,4,5,7,9,11],
  "natural-minor": [0,2,3,5,7,8,10],
  "harmonic-minor":[0,2,3,5,7,8,11],
  "melodic-minor": [0,2,3,5,7,9,11]
};

export function getScale(root, type) {
  const scaleNotes = buildScale(root, SCALE_INTERVALS[type]);
  const map = {};
  for (let octave=3; octave<=6; octave++) {
    scaleNotes.forEach((note,i) => {
      map[`${note}${octave}`] = SOLFEGE_MAJOR[i];
    });
  }
  return map;
}
