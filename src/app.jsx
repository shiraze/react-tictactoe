import Header from "./components/header";
import History from "./components/history";
import Game from "./components/game";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";

const App = () => (
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);

export default App;
