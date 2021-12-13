import clsx from "clsx";
import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

import { CurrentWeather } from "Components/Weather/CurrentWeather";
import { RootState } from "Redux/ReduxProvider";
import { actionCreator } from "Redux/Header/ActionCreator";

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
      backgroundColor: theme.palette.secondary.dark,
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
  mobileMenuButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const mapStateToProps = (state: RootState) => ({
  navigation: state.header.navigationOpen,
  pageTitle: state.header.title,
});

const mapDispatchToProps = {
  openNavigation: actionCreator.openNavigation,
  closeNavigation: actionCreator.closeNavigation,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export const DashboardHeaderController = (props: Props) => {
  const { openNavigation, closeNavigation, navigation, pageTitle } = props;
  const classes = useStyles();
  // const navigation = useSelector((state => state.header.navigationOpen);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {matches ? (
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              classes={{ root: classes.mobileMenuButton }}
              color="inherit"
              onClick={navigation ? closeNavigation : openNavigation}>
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
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, navigation && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={navigation ? closeNavigation : openNavigation}
              classes={{
                root: clsx(
                  classes.menuButton,
                  navigation && classes.menuButtonHidden
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

export const DashboardHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardHeaderController);
