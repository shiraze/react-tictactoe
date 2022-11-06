import React from "react";
import { useState } from "react";

import { connect } from "react-redux";
import store from "../redux/store";

import { calculateWinner } from "../utils/calculateWinner";

import Board from "./board";

const Game = (props) => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      col: null,
      row: null,
      lastPlayed: null,
    },
  ]);

  const current = history[props.step];
  const winner = calculateWinner(current.squares);
  const xIsNext = props.step % 2 === 0;
  const status = winner
    ? `Winner: ${winner.name}`
    : props.step === 9
    ? "Game Tie!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  props.addHeaderHistory(status, history);

  return (
    <Board
      squares={current.squares}
      onClick={(i) => handleClick(i, xIsNext)}
      lastPlayed={current.lastPlayed}
      winningLine={winner ? winner.line : null}
    />
  );

  function handleClick(i, xIsNext) {
    const currentHistory = history.slice(0, props.step + 1);
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
    store.dispatch({ type: "SET_STEP", payload: history.length });
  }

  // componentDidUpdate() {
  //   const history = this.state.history;
  //   const current = history[this.props.step];
  //   const winner = calculateWinner(current.squares);
  //   const xIsNext = this.props.step % 2 === 0;

  //   let status;
  //   if (winner) {
  //     status = `Winner: ${winner.name}`;
  //   } else if (this.props.step === 9) {
  //     status = "Game Tie!";
  //   } else {
  //     status = `Next player: ${xIsNext ? "X" : "O"}`;
  //   }

  //   this.props.addHeaderHistory(status, history);
  // }
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
