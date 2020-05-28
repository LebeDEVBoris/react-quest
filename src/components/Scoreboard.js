import React from 'react';

export default function Scoreboard({wins, losses}) {
  return (
    <div className="scoreboard">
      <div className="wrong">
        <strong>{losses}</strong>
        <span>wrong</span>
      </div>
      <div className="correct">
        <strong>{wins}</strong>
        <span>correct</span>
      </div>
    </div>
  );
}
