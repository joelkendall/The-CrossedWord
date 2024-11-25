import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function Display() {
  const location = useLocation();
  const { charNumber, letters: initialLetters, hint, altHint, solution } = location.state || {};
  const [elapsedTime, setElapsedTime] = useState(0);
  const [letters, setLetters] = useState(initialLetters);
  const [currentWord, setCurrentWord] = useState(initialLetters.join(''));
  const [isModalOn, setIsModalOn] = useState(false);
  const readOnlyStatus = initialLetters.map((letter) => letter !== '');
  const inputRefs = useRef([]);

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLetterChange = (e, index) => {
    const newLetters = [...letters];
    newLetters[index] = e.target.value;
    setLetters(newLetters);

    const newWord = newLetters.join('');
    setCurrentWord(newWord);

    let nextIndex = index + 1;
    while (nextIndex < inputRefs.current.length && inputRefs.current[nextIndex].current.readOnly) {
      nextIndex++;
    }
    if (e.target.value && nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !letters[index] && index > 0) {
      let prevIndex = index - 1;
      while (prevIndex >= 0 && inputRefs.current[prevIndex].current.readOnly) {
        prevIndex--;
      }
      if (prevIndex >= 0) {
        inputRefs.current[prevIndex].current.focus();
      }
    } else if (e.key === ' ' && index < inputRefs.current.length - 1) {
      e.preventDefault(); // Preventing space from being entered into the 'known' letters
      let nextIndex = index + 1;
      while (nextIndex < inputRefs.current.length && inputRefs.current[nextIndex].current.readOnly) {
        nextIndex++;
      }
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].current.focus();
      }
    }
  };

  const handleCheckSolution = () => {
    if (currentWord === solution) {
      setIsModalOn(true);
    } else {
      
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="Display">
      <div>
        <h2>Hint: {hint}</h2>
        <h2>Alternative Hint: {altHint}</h2>
      </div>
      <div>
        <h2>Time Spent Pondering: {formatTime(elapsedTime)}</h2>
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
            ref={inputRefs.current[index] = inputRefs.current[index] || React.createRef()}
            className="details-letter-input"
            readOnly={readOnlyStatus[index]} // Making the input read-only if the letter is known
          />
        ))}
      </div>
      <div>
        <h2>Current Word: {currentWord}</h2>
      </div>
      <div>
        <button onClick={handleCheckSolution}>
          Check Solution
        </button>
        <button>
          New Word
        </button>
      </div>

      {isModalOn && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOn(false)}>&times;</span>
            <h2>WOW!!</h2>
            <p>You got it right!!</p>
            <p>And it only took you {}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Display;