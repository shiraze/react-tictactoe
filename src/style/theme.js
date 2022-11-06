import { createMuiTheme } from "@material-ui/core/styles";
import "./index.css";
import "typeface-roboto";

export default createMuiTheme({
  palette: {
    primary: { main: "#ff5722" },
    secondary: { main: "#2979ff" },
  },
  typography: {
    useNextVariants: true,
  },
});
