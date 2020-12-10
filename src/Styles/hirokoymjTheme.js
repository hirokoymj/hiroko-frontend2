import { createMuiTheme } from "@material-ui/core/styles";

export const hirokoymjTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#2E7D32",
    },
    secondary: {
      main: "#4CAF50",
    },
    text: {
      primary: "#000",
    },
    background: {
      default: "#f2f3f3",
    },
  },
  typography: {
    fontFamily: ["proxima-nova", "sans-serif"].join(","),
  },
});
