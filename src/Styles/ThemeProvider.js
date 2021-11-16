import React, { useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";

// import { hirokoymjTheme } from "./hirokoymjTheme";
import { hirokoymjThemeXmas } from "./hirokoymjThemeXmas";

console.log(hirokoymjThemeXmas);

export const ThemeFunctionsContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme] = useState(hirokoymjThemeXmas);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
