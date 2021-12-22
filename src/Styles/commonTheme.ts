import { createTheme } from "@material-ui/core/styles";

export const commonTheme = createTheme({
  palette: {
    primary: {
      light: "#4dabf5",
      main: "#2196f3",
      dark: "#1769aa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#6fb2ee",
      main: "#4b9fea",
      dark: "#346fa3",
      contrastText: "#fff",
    },
    text: {
      primary: "#000",
    },
    background: {
      default: "#f2f3f3",
    },
    accent: {
      main: "#e7f7fe",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif", "Titillium Web"].join(","),
  },
});
