import { useState } from "react";
import clsx from "clsx";
import {
  useTheme,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Switch from "@material-ui/core/Switch";
import { orange } from "@material-ui/core/colors";

import { CurrentWeather } from "Components/Weather/CurrentWeather";
import { RootState } from "Redux/ReduxProvider";
import { toggleNavigation } from "Redux/Navigation/navigationSlice";
import { setTheme } from "Redux/Theme/themeSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    padding: theme.spacing(0, 5, 0, 3),
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontFamily: ["Titillium Web", "sans-serif"].join(","),
    fontSize: "1.5rem",
  },
}));

const OrangeSwitch = withStyles({
  switchBase: {},
  checked: {
    color: orange[300],
    "&$checked": {
      color: orange[500],
    },
    "&$checked + $track": {
      backgroundColor: orange[500],
    },
  },
  track: {},
})(Switch);

export const DashboardHeader = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.navigation.isOpen);
  const pageTitle = useSelector((state: RootState) => state.title.text);
  const [themeChecked, setThemeChecked] = useState(true);
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSwitchChange = (event: any) => {
    setThemeChecked(event.target.checked);
    const themeName = event.target.checked ? "common" : "seasonal";
    dispatch(setTheme(themeName));
  };

  return (
    <>
      {matches ? (
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              classes={{ root: classes.menuButton }}
              color="inherit"
              onClick={() => dispatch(toggleNavigation())}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              {pageTitle}
            </Typography>
            <OrangeSwitch
              checked={themeChecked}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, isOpen && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => dispatch(toggleNavigation())}
              classes={{
                root: clsx(
                  classes.menuButton,
                  isOpen && classes.menuButtonHidden
                ),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              {pageTitle}
            </Typography>
            <OrangeSwitch
              checked={themeChecked}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <Link
              component={RouterLink}
              to={{
                pathname: "/",
                state: { title: "7 days Forecast" },
              }}
              underline="none">
              <CurrentWeather city="tokyo" />
            </Link>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};
