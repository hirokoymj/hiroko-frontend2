import { createMuiTheme } from "@material-ui/core/styles";

export const hirokoymjTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#002653",
    },
    secondary: {
      main: "#4CAF50",
      light: "#c8e6c9",
    },
    text: {
      primary: "#000",
    },
    background: {
      default: "#f2f3f3",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif", "Titillium Web"].join(","),
  },
});
