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
    // contrastThreshold: 2,
    // success: {
    //   main: "#00E676",
    //   light: "#00E676",
    //   dark: "#00C853",
    // },
    // warning: {
    //   main: "#FFA000",
    //   light: "#FFC107",
    //   dark: "#FFA000",
    // },
  },
  typography: {
    fontFamily: ["proxima-nova", "sans-serif"].join(","),
  },
});
