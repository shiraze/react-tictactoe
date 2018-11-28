import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import Header from './Header';
import History from './History';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import 'typeface-roboto';

import './index.css';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#ff5722' },
        secondary: { main: '#2979ff' },
    },
    typography: {
        useNextVariants: true,
    },
});

function Square(props) {
    return (
        <button className={props.className}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

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
        const highlight = i === this.props.lastPlayed || (this.props.winningLine && this.props.winningLine.indexOf(i) > -1);
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            className={highlight ? "boldsquare" : "square"}
        />;
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                col: null,
                row: null,
                lastPlayed: null,
            }],
            reverseOrder: false,
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.props.step];
        const winner = calculateWinner(current.squares);
        const xIsNext = (this.props.step % 2) === 0;

        return (
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i, xIsNext)}
                lastPlayed={current.lastPlayed}
                winningLine={winner ? winner.line : null}
            />
        );
    }

    componentDidUpdate(){
        const history = this.state.history;
        const current = history[this.props.step];
        const winner = calculateWinner(current.squares);
        const xIsNext = (this.props.step % 2) === 0;

        let status;
        if (winner) {
            status = 'Winner: ' + winner.name;
        } else if (this.props.step === 9) {
            status = 'Game Tie!';
        } else {
            status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }

        this.props.addHeaderHistory(status, history);
    }

    handleClick(i, xIsNext) {
        const history = this.state.history.slice(0, this.props.step + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                col: (i % 3) + 1,
                row: parseInt(i / 3) + 1,
                lastPlayed: i,
            }]),
        });
        store.dispatch({ type: "SET_STEP", payload: history.length });
    }
}

const mapStateToProps = (state) => { return { step: state.step } };
const mapDispatchToProps = dispatch => {
    return {
        addHeaderHistory: (header, history) => {
            dispatch({ type: "SET_HEADER", payload: header });
            dispatch({ type: "SET_HISTORY", payload: history });
        },
    }
};
Game = connect(mapStateToProps, mapDispatchToProps)(Game);

const initialState = {
    status: "",
    history: [],
    step: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_HEADER":
            return { ...state, status: action.payload }
        case "SET_HISTORY":
            return { ...state, history: action.payload }
        case "SET_STEP":
            return { ...state, step: action.payload }
        default:
            return state;
    }
}

const store = createStore(reducer);

const App = () => (
    <MuiThemeProvider theme={theme}>
        <Grid container>
            <Header />
        </Grid>
        <div style={{ padding: 10 }} />
        <Paper>
            <Grid container spacing={8}>
                <Grid item sm={6} xs={12}>
                    <Game />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <History />
                </Grid>
            </Grid>
        </Paper>
    </MuiThemeProvider>
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { name: squares[a], line: lines[i] };
        }
    }
    return null;
}