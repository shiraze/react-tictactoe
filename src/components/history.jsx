import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

const History = (props) => {
  const [reverseOrder, setReverseOrder] = useState(false);

  const order = reverseOrder ? "reverseOrder" : "";
  const historyList = !!props.history[1];

  const moves = props.history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    const location = step.col ? `(${step.col},${step.row})` : "";
    if (!historyList) return "";
    return (
      <li key={move}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </Button>
        {location}
      </li>
    );
  });

  return (
    <>
      <Collapse in={historyList}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setReverseOrder(!reverseOrder)}
        >
          Toggle History Order
        </Button>
      </Collapse>
      <ol className={order}>{moves}</ol>
    </>
  );

  function jumpTo(step) {
    props.dispatch({ type: "SET_STEP", payload: step });
  }
};

const mapStateToProps = (state) => {
  return { history: state.history };
};
export default connect(mapStateToProps)(History);
