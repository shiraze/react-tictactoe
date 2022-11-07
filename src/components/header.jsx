import { connect } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = ({ status }) => (
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
        {status}
      </Typography>
    </Toolbar>
  </AppBar>
);

const mapStateToProps = (state) => ({ status: state.status });

export default connect(mapStateToProps)(Header);
