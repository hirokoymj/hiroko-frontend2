import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useSelector, useDispatch } from "react-redux";

import {
  TechNavItems,
  CovidListItem,
  LoginListItem,
} from "Components/Lists/NavigationLists";
import { Logo } from "Components/Layouts/Logo";
import { RootState } from "Redux/ReduxProvider";
import { toggleNavigation } from "Redux/Navigation/navigationSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    background: theme.palette.background.default,
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
      width: theme.spacing(7),
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 5),
  },
  leftIcon: {
    padding: "10px",
    marginLeft: theme.spacing(1),
    "&:hover": {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.accent.main,
    },
  },
}));

export const MenuDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.navigation.isOpen);
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
      }}
      open={isOpen}>
      <div className={classes.toolbarIcon}>
        <Logo />
        <IconButton
          onClick={() => dispatch(toggleNavigation())}
          classes={{ root: classes.leftIcon }}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <TechNavItems />
      </List>
      <Divider />
      <List>
        <CovidListItem />
      </List>
      <List>
        <LoginListItem />
      </List>
      <Divider />
    </Drawer>
  );
};

export const MobileMenuDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.navigation.isOpen);

  return (
    <Drawer open={isOpen} onClose={() => dispatch(toggleNavigation())}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <Divider />
      <List>
        <TechNavItems />
      </List>
      <Divider />
      <List>
        <CovidListItem />
      </List>
    </Drawer>
  );
};
