import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { connect } from "react-redux";

import {
  TechNavItems,
  ResumeListItems,
  PhotoListItems,
} from "Components/Lists/NavigationLists";
import { Logo } from "Components/Layouts/Logo";
import { RootState } from "Redux/ReduxProvider";
import { actionCreator } from "Redux/Header/ActionCreator";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

const mapStateToProps = (state: RootState) => {
  return {
    open: state.header.navigationOpen,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   closeNavigation: () => {
//     dispatch(actionCreator.closeNavigation());
//   },
//   openNavigation: () => {
//     dispatch(actionCreator.openNavigation());
//   },
// });

const mapDispatchToProps = {
  closeNavigation: actionCreator.closeNavigation,
  openNavigation: actionCreator.openNavigation,
};

type IProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const MenuDrawerController = (props: IProps) => {
  const { closeNavigation, openNavigation, open } = props;
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}>
      <div className={classes.toolbarIcon}>
        <Logo />
        <IconButton onClick={open ? closeNavigation : openNavigation}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <TechNavItems />
      </List>
      <Divider />
      <List>
        <ResumeListItems />
      </List>
      <Divider />
      <List>
        <PhotoListItems />
      </List>
    </Drawer>
  );
};

export const MobileMenuDrawerController = (props: IProps) => {
  const { openNavigation, closeNavigation, open } = props;
  const classes = useStyles();

  return (
    <Drawer open={open} onClose={open ? closeNavigation : openNavigation}>
      <div className={classes.logo}>
        <Logo />
      </div>
      <Divider />
      <List>
        <TechNavItems />
      </List>
      <Divider />
      <List>
        <ResumeListItems />
      </List>
      <Divider />
      <List>
        <PhotoListItems />
      </List>
    </Drawer>
  );
};

export const MenuDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuDrawerController);

export const MobileMenuDrawer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenuDrawerController);
