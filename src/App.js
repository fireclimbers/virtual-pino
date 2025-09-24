import React, { useState } from "react";
import Piano from "./Piano";
import { getScale } from "./scales";

function App() {
  const [keySignature, setKeySignature] = useState("C");
  const [scaleType, setScaleType] = useState("major");

  const solfegeMap = getScale(keySignature, scaleType);

  return (
    <div className="App">
      <h1>Virtual Piano</h1>

      <div className="controls">
        <label>
          Key:
          <select
            value={keySignature}
            onChange={(e) => setKeySignature(e.target.value)}
          >
            {["C","Cs","D","Ds","E","F","Fs","G","Gs","A","As","B"].map((note) => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </label>

        <label>
          Scale:
          <select
            value={scaleType}
            onChange={(e) => setScaleType(e.target.value)}
          >
            <option value="major">Major</option>
            <option value="natural-minor">Natural Minor</option>
            <option value="harmonic-minor">Harmonic Minor</option>
            <option value="melodic-minor">Melodic Minor</option>
          </select>
        </label>
      </div>

      <Piano solfegeMap={solfegeMap} />
    </div>
  );
}

export default App;
