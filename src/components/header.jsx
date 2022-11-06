import React from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = (props) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Tic Tac Toe
      </Typography>
      <Typography
        variant="h6"
        color="inherit"
        align="right"
        style={{ flex: 1 }}
      >
        {props.status}
      </Typography>
    </Toolbar>
  </AppBar>
);

const mapStateToProps = (state) => ({ status: state.status });

export default connect(mapStateToProps)(Header);
