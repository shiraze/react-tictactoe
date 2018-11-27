import React from 'react';
import ReactDOM from 'react-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
            stepNumber: 0,
            xIsNext: true,
            reverseOrder: false,
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const order = this.state.reverseOrder ? "reverseOrder" : "";
        const historyList = !!history[1];

        const moves = history.map((step, move) => {
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

        let status;
        if (winner) {
            status = 'Winner: ' + winner.name;
        } else if (this.state.stepNumber === 9) {
            status = 'Game Tie!';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <MuiThemeProvider theme={theme}>
                <Grid container>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">
                                Tic Tac Toe
                            </Typography>
                            <Typography variant="h6" color="inherit" align="right" style={{ flex: 1 }}>
                                {status}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <div style={{ padding:10 }}/>
                <Paper>
                    <Grid container spacing={8}>
                        <Grid item sm={6} xs={12}>
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                                lastPlayed={current.lastPlayed}
                                winningLine={winner ? winner.line : null}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Collapse in={historyList}>
                                <Button variant="contained" color="primary" onClick={() =>
                                    this.setState({
                                        reverseOrder: !this.state.reverseOrder,
                                    })
                                }>Toggle History Order</Button>
                            </Collapse>
                            <ol className={order}>{moves}</ol>
                        </Grid>
                    </Grid>
                </Paper>
            </MuiThemeProvider>
        );
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                col: (i % 3) + 1,
                row: parseInt(i / 3) + 1,
                lastPlayed: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
}

ReactDOM.render(
    <Game />,
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