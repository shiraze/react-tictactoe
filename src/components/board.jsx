import React from "react";

import Square from "./square";

class Board extends React.Component {
  renderRow(i) {
    return (
      <div className="board-row">
        {this.renderSquare(i++)}
        {this.renderSquare(i++)}
        {this.renderSquare(i)}
      </div>
    );
  }

  renderSquare(i) {
    const highlight =
      i === this.props.lastPlayed ||
      (this.props.winningLine && this.props.winningLine.indexOf(i) > -1);
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        className={highlight ? "boldsquare" : "square"}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderRow(0)}
        {this.renderRow(3)}
        {this.renderRow(6)}
      </div>
    );
  }
}

export default Board;
