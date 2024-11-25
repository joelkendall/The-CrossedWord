import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Details() {
  const [charNumber, setCharNumber] = useState(0);
  const [letters, setLetters] = useState([]);
  const inputRefs = useRef([]);
  const [hint, setHint] = useState('');
  const [altHint, setAltHint] = useState('');
  const [solution, setSolution] = useState('');
  const navigate = useNavigate();


  const handleCharNumberChange = (e) => {
    const charNum = parseInt(e.target.value, 10);
    if (!isNaN(charNum) && charNum > 1 && charNum < 21) {
      setCharNumber(charNum);
      setLetters(Array(charNum).fill(''));
      inputRefs.current = Array(charNum).fill().map((_, i) => inputRefs.current[i] || React.createRef());
    } else {
      setCharNumber(0);
      setLetters([]);
      inputRefs.current = [];
    }
  };

  const handleLetterChange = (e, index) => {
    const newLetters = [...letters];
    newLetters[index] = e.target.value;
    setLetters(newLetters);


    if (e.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !letters[index] && index > 0) {
      inputRefs.current[index - 1].current.focus();
    } else if (e.key === ' ' && index < inputRefs.current.length - 1) {
      e.preventDefault(); // Prevent space from being entered to stop them being locked in for the the display
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleSubmit = () => {
    navigate('/display', { state: { charNumber, letters, hint, altHint, solution } });
  };

  return (
    <div className="Details">
      <h1 className="page-header">What's Your Word?</h1>

      <div>
        <div className="inp-txt">
          <label htmlFor="char-number">Number of Characters:</label>
          <input
            id="char-number"
            className="text-input"
            type="text"
            placeholder="Between 2-20"
            onChange={handleCharNumberChange}
          />
        </div>
        <div className="letter-boxes">
          {letters.map((letter, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={letter}
              onChange={(e) => handleLetterChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={inputRefs.current[index]}
              className="details-letter-input"
            />
          ))}
        </div>
        <div className="inp-txt">
          <label htmlFor="word-hint">Default Hint:</label>
          <input id="word-hint" className="text-input" type="text" placeholder="" value={hint} onChange={(e) => setHint(e.target.value)} />
        </div>
        <div className="inp-txt">
          <label htmlFor="alt-hint">Alternative Hint:</label>
          <input id="alt-hint" className="text-input" type="text" placeholder="" value={altHint} onChange={(e) => setAltHint(e.target.value)} />
        </div>
        <div className="inp-txt">
          <label htmlFor="solution-input">Solution:</label>
          <input id="solution-input" className="text-input" type="password" placeholder="" value={solution} onChange={(e) => setSolution(e.target.value)} />
        </div>
        <button onClick={handleSubmit}>Go to Display</button>
      </div>
    </div>
  );
}

export default Details;