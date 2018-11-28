import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reverseOrder: false,
        };
    }

    render() {
        const order = this.state.reverseOrder ? "reverseOrder" : "";
        const historyList = !!this.props.history[1];

        const moves = this.props.history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            const location = step.col ? "(" + step.col + "," + step.row + ")" : "";
            if (!historyList) return "";
            return (
                <li key={move}>
                    <Button variant="outlined" color="secondary" onClick={() => this.jumpTo(move)}>{desc}</Button> {location}
                </li>
            )
        })

        return (
            <>
                <Collapse in={historyList}>
                    <Button variant="contained" color="primary" onClick={() =>
                        this.setState({
                            reverseOrder: !this.state.reverseOrder,
                        })
                    }>Toggle History Order</Button>
                </Collapse>
                <ol className={order}>{moves}</ol>
            </>
        );
    }

    jumpTo(step) {
        this.props.dispatch({ type: "SET_STEP", payload: step });
    }
}

const mapStateToProps = (state) => { return { history: state.history } };
export default connect(mapStateToProps)(History);