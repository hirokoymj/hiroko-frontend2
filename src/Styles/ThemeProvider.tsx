import React, { useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useSelector } from "react-redux";
import { RootState } from "Redux/ReduxProvider";
import { Theme } from "@material-ui/core/styles";

import { commonTheme } from "./commonTheme";
import { xmasTheme } from "./xmasTheme";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent: PaletteOptions["primary"];
  }
}

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setCurrentTheme] = useState<Theme>(commonTheme);
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme
  );

  useEffect(() => {
    currentTheme === "seasonal"
      ? setCurrentTheme(xmasTheme)
      : setCurrentTheme(commonTheme);
  }, [currentTheme]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
