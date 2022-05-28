import { createTheme } from "@material-ui/core/styles";

export const xmasTheme = createTheme({
  palette: {
    primary: {
      light: "#57975b",
      main: "#2e7d32",
      dark: "#1b5e20",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#fff",
    },
    text: {
      primary: "#000",
    },
    background: {
      default: "#f2f3f3",
    },
    accent: {
      main: "#fce4ec",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif", "Titillium Web"].join(","),
  },
});
