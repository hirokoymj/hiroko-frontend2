import React, { useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// import { hirokoymjTheme } from "./hirokoymjTheme";
import { hirokoymjThemeXmas } from "./hirokoymjThemeXmas";

type Props = {
  children: React.ReactNode;
};
export const ThemeProvider = ({ children }: Props) => {
  const [theme] = useState(hirokoymjThemeXmas);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
