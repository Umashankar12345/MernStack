import React, { useState } from 'react';
import './App.css';

function NumberMatchingGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [matchedNumbers, setMatchedNumbers] = useState([]);

  const startGame = () => {
    // Generate 4 random numbers between 1-9
    const randomNumbers = [];
    for (let i = 0; i < 4; i++) {
      randomNumbers.push(Math.floor(Math.random() * 9) + 1);
    }
    
    setNumbers(randomNumbers);
    setSelectedNumbers([]);
    setInputValue('');
    setResult('');
    setGameStarted(true);
    setAttempts(0);
    setMatchedNumbers([]);
  };

  const handleNumberClick = (number) => {
    if (selectedNumbers.length < 4) {
      const newSelected = [...selectedNumbers, number];
      setSelectedNumbers(newSelected);
      
      // Update display
      setInputValue(inputValue + number.toString());
      
      // Check if we've selected 4 numbers
      if (newSelected.length === 4) {
        checkResult(newSelected);
      }
    }
  };

  const checkResult = (selected) => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    // Check if selected numbers match the generated numbers (in any order)
    const sortedSelected = [...selected].sort();
    const sortedNumbers = [...numbers].sort();
    
    const isMatch = JSON.stringify(sortedSelected) === JSON.stringify(sortedNumbers);
    
    if (isMatch) {
      setResult('WIN! 🎉');
      setMatchedNumbers([...numbers]);
    } else {
      setResult('LOSS 😞');
      
      // Clear for next attempt
      setTimeout(() => {
        setSelectedNumbers([]);
        setInputValue('');
        setResult('');
      }, 1500);
    }
  };

  const handleInputChange = (e) => {
    // Only allow numbers and limit to 4 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setInputValue(value);
    
    // Convert string to array of numbers
    const newSelected = value.split('').map(Number);
    setSelectedNumbers(newSelected);
    
    // Check if we have 4 numbers
    if (newSelected.length === 4) {
      checkResult(newSelected);
    }
  };

  const clearInput = () => {
    setSelectedNumbers([]);
    setInputValue('');
    setResult('');
  };

  return (
    <div className="game-container">
      <h1>Number Matching Game</h1>
      
      <div className="instructions">
        <p>Click "Start Game" to generate 4 random numbers.</p>
        <p>Click the number buttons to match all 4 numbers exactly.</p>
        <p>Or type 4 digits in the input box.</p>
        <p>Win when you match all 4 numbers!</p>
      </div>

      <div className="game-controls">
        {!gameStarted ? (
          <button className="start-btn" onClick={startGame}>
            Start Game
          </button>
        ) : (
          <div className="game-area">
            <div className="generated-numbers">
              <h3>Target Numbers: {matchedNumbers.length > 0 ? 
                matchedNumbers.join(' ') : '?? ?? ?? ??'}</h3>
            </div>
            
            <div className="input-section">
              <h3>Your Selection:</h3>
              <div className="input-display">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type 4 digits or click buttons"
                  maxLength={4}
                  disabled={result === 'WIN! 🎉'}
                />
                <button 
                  className="clear-btn" 
                  onClick={clearInput}
                  disabled={result === 'WIN! 🎉'}
                >
                  Clear
                </button>
              </div>
              <p>Selected: {selectedNumbers.join(' ')}</p>
            </div>

            <div className="number-buttons">
              <h3>Click Numbers:</h3>
              <div className="button-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    className="number-btn"
                    onClick={() => handleNumberClick(num)}
                    disabled={
                      selectedNumbers.length >= 4 || 
                      result === 'WIN! 🎉' ||
                      result === 'LOSS 😞'
                    }
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="result-section">
              <h3>Result:</h3>
              <div className={`result-display ${result.includes('WIN') ? 'win' : 'loss'}`}>
                {result || 'No result yet'}
              </div>
              {result === 'WIN! 🎉' && (
                <p className="success-message">
                  Congratulations! You won in {attempts} attempt{attempts > 1 ? 's' : ''}!
                </p>
              )}
              {result === 'LOSS 😞' && (
                <p className="attempt-message">
                  Attempt {attempts}. Try again!
                </p>
              )}
            </div>

            <div className="game-stats">
              <p>Attempts: {attempts}</p>
              <button className="restart-btn" onClick={startGame}>
                Restart Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NumberMatchingGame;