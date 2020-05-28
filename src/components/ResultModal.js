import React from 'react';

export default function ResultModal({ isWin, fetchData, correct }) {
  return (
    <div className="result-modal">
      <div className="overlay" />
      <div className="result-modal-content">
       
        {isWin &&
        <h3>
          👊👊👊
          <br />
          YOU WON!
        </h3>}

        {!isWin &&
        <h3>
          😟😢😟
          <br />
          YOU LOST!
        </h3>}

        {!isWin &&
        <div className="correct-answer">
          <small>The correct answer was:</small>
          <br />
          <strong>{correct}</strong>
        </div>}

        <button onClick={() => fetchData()}>Go to next question 👉</button>
      </div>
    </div>
  );
}
