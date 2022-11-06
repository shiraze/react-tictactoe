import React from "react";

import Square from "./square";

const Board = ({ lastPlayed, winningLine, squares, onClick }) => {
  function renderSquare(i) {
    const highlight =
      i === lastPlayed || (winningLine && winningLine.indexOf(i) > -1);

    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        className={highlight ? "boldsquare" : "square"}
      />
    );
  }

  function renderRow(i) {
    return (
      <div className="board-row">
        {renderSquare(i++)}
        {renderSquare(i++)}
        {renderSquare(i)}
      </div>
    );
  }

  return (
    <div>
      {renderRow(0)}
      {renderRow(3)}
      {renderRow(6)}
    </div>
  );
};

export default Board;
