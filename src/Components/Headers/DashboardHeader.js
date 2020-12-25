import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { openNavigation } from "Redux/Navigation/ActionCreator";
import { useCurrentLocation } from "Hooks/useCurrentLocation";
import { CurrentWeather } from "Components/Weather/CurrentWeather";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
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

export const DashboardHeader = connect(
  (state) => ({
    open: state.navigation.navigationOpen,
    pageTitle: state.pageTitle.title,
  }),
  { openNavigation }
)(({ openNavigation, open, pageTitle }) => {
  const classes = useStyles();
  const { location, error } = useCurrentLocation();
  console.log("DashboardHeader");

  if (location) {
    console.log(typeof location.latitude);
    console.log(location);
  } else {
    console.log(location);
  }

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={openNavigation}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {pageTitle}
        </Typography>
        {!location ? (
          <p>loading</p>
        ) : (
          // 35.652832, 139.839478
          <CurrentWeather lat="35.652832" lon="139.839478" />
        )}
      </Toolbar>
    </AppBar>
  );
});
