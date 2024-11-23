import React, {useState} from 'react';

function Details() {
  return (
    <div className="Details">
      <h1 className="page-header">What's Your Word?</h1>

      <div>
        <div className="inp-txt">
            <label for="char-number">Number of Characters:</label>
            <input id="char-number" className="text-input" type="text" placeholder="Between 2-20" />
        </div>
        <div className="inp-txt">
            <label for="word-hint">Default Hint:</label>
            <input id="word-hint" className="text-input" type="text" placeholder="" />
        </div>
        <div className="inp-txt">
            <label for="alt-hint">Alternative Hint:</label>
            <input id="alt-hint" className="text-input" type="text" placeholder="" />
        </div>
        <div className="inp-txt">
            <label for="solution-input">Solution:</label>
            <input id="solution-input" className="text-input" type="password" placeholder="" />
        </div>
      </div>
    </div>
  );
}

export default Details;