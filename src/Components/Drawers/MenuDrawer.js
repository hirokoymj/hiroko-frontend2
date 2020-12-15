import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

import { MainListItems } from "Components/Lists/MainListItems";
import { closeNavigation } from "Redux/Navigation/ActionCreator";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  logoHiroko: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontWeight: 700,
    fontSize: "1.5rem",
  },
  logoDotCom: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontWeight: 300,
    fontSize: "1.5rem",
  },
}));

export const MenuDrawer = connect(
  (state) => ({
    open: state.navigation.navigationOpen,
  }),
  { closeNavigation }
)(({ closeNavigation, open }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <Typography variant="h6" component="h1">
          <span className={classes.logoHiroko}>hiroko</span>
          <span className={classes.logoDotCom}>ymj.com</span>
        </Typography>
        <IconButton onClick={closeNavigation}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{MainListItems}</List>
      <Divider />
    </Drawer>
  );
});
