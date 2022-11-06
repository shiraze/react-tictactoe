import React from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends React.Component {
    render() {
        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Tic Tac Toe
                    </Typography>
                    <Typography variant="h6" color="inherit" align="right" style={{ flex: 1 }}>
                        {this.props.status}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => { return { status: state.status } };
export default connect(mapStateToProps)(Header);