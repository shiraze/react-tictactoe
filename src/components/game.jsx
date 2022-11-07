import { useState, useEffect } from "react";

import { connect } from "react-redux";

import { calculateWinner } from "../utils/calculateWinner";

import Board from "./board";

const Game = ({ step, addHeaderHistory, setStep }) => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      col: null,
      row: null,
      lastPlayed: null,
    },
  ]);

  useEffect(() => {
    const status = winner
      ? `Winner: ${winner.name}`
      : step === 9
      ? "Game Tie!"
      : `Next player: ${xIsNext ? "X" : "O"}`;

    addHeaderHistory(status, history);
  });

  const current = history[step];
  const winner = calculateWinner(current.squares);
  const xIsNext = step % 2 === 0;

  return (
    <Board
      squares={current.squares}
      onClick={(i) => handleClick(i, xIsNext)}
      lastPlayed={current.lastPlayed}
      winningLine={winner ? winner.line : null}
    />
  );

  function handleClick(i, xIsNext) {
    const currentHistory = history.slice(0, step + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      currentHistory.concat([
        {
          squares: squares,
          col: (i % 3) + 1,
          row: parseInt(i / 3) + 1,
          lastPlayed: i,
        },
      ])
    );
    setStep(currentHistory.length);
  }
};

const mapStateToProps = (state) => {
  return { step: state.step };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addHeaderHistory: (header, history) => {
      dispatch({ type: "SET_HEADER", payload: header });
      dispatch({ type: "SET_HISTORY", payload: history });
    },
    setStep: (step) => {
      dispatch({ type: "SET_STEP", payload: step });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
