import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, Theme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";

import { DashboardHeader } from "Components/Headers/DashboardHeader";
import { MenuDrawer, MobileMenuDrawer } from "Components/Drawers/MenuDrawer";
import { CategoryView } from "Containers/CategoryView";
import { SubCategoryView } from "Containers/SubCategoryView";
import { TopicView } from "Containers/TopicView";
import { ReferenceView } from "Containers/ReferenceView";
import { PageFooter } from "Components/Layouts/Footer";
import { DailyForecastView } from "Containers/DailyForecastView";
import { CounterView } from "Containers/CounterView";
import { CovidChartView } from "Containers/CovidChartView";
import { LoginView } from "Containers/LoginView";
import { RegisterView } from "Containers/RegisterView";
import { LoginTestView } from "Containers/LoginTestView";

import {
  closeNavigation,
  openNavigation,
} from "Redux/Navigation/navigationSlice";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
}));

export const DashboardController = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  if (matches) {
    dispatch(closeNavigation());
  } else {
    dispatch(openNavigation());
  }

  return (
    <div className={classes.root}>
      <DashboardHeader />
      {matches ? <MobileMenuDrawer /> : <MenuDrawer />}
      <SnackbarProvider
        maxSnack={1}
        dense
        preventDuplicate
        anchorOrigin={
          matches
            ? { horizontal: "center", vertical: "bottom" }
            : { horizontal: "left", vertical: "top" }
        }
        autoHideDuration={2500}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path="/" exact component={DailyForecastView} />
            <Route path="/tech" component={ReferenceView} />
            <Route path="/categoryList" component={CategoryView} />
            <Route path="/subCategoryList" component={SubCategoryView} />
            <Route path="/topicList" component={TopicView} />
            <Route path="/test" component={CounterView} />
            <Route path="/covid19" component={CovidChartView} />
            <Route path="/login" component={LoginView} />
            <Route path="/register" component={RegisterView} />
            <Route path="/logintest" component={LoginTestView} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
          <PageFooter />
        </main>
      </SnackbarProvider>
    </div>
  );
};
