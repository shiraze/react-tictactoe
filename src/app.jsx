import React from "react";

import Header from "./components/header";
import History from "./components/history";
import Game from "./components/game";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./style/theme";

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

export default App;
