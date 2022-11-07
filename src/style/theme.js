import { createTheme } from "@mui/material/styles";
import "./index.css";
import "typeface-roboto";

export default createTheme({
  palette: {
    primary: { main: "#ff5722" },
    secondary: { main: "#2979ff" },
  },
  typography: {
    useNextVariants: true,
  },
});
