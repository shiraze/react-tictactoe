import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

const History = ({ history, setStep }) => {
  const [reverseOrder, setReverseOrder] = useState(false);

  const order = reverseOrder ? "reverseOrder" : "";
  const historyList = !!history[1];

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    const location = step.col ? `(${step.col},${step.row})` : "";
    if (!historyList) return "";
    return (
      <li key={move}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setStep(move)}
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
};

const mapStateToProps = (state) => {
  return { history: state.history };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setStep: (step) => {
      dispatch({ type: "SET_STEP", payload: step });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
