import React from "react";

import Square from "./square";

const Board = (props) => {
  function renderSquare(i) {
    const highlight =
      i === props.lastPlayed ||
      (props.winningLine && props.winningLine.indexOf(i) > -1);

    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
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
