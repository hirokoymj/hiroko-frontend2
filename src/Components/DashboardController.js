import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { DashboardHeader } from "Components/Headers/DashboardHeader";
import { MenuDrawer, MobileMenuDrawer } from "Components/Drawers/MenuDrawer";
import { CategoryView } from "Components/PageView/CategoryView";
import { SubCategoryView } from "Components/PageView/SubCategoryView";
import { TopicView } from "Components/PageView/TopicView";
import { ReferenceView } from "Components/PageView/ReferenceView";
import { PageFooter } from "Components/Layouts/Footer";
import { DailyForecastView } from "Components/PageView/DailyForecastView";
import {
  closeNavigation,
  openNavigation,
} from "Redux/Navigation/ActionCreator";
import { TestView } from "Components/PageView/TestView";
import { PhotoView } from "Components/PageView/PhotoView";

const useStyles = makeStyles((theme) => ({
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

export const DashboardController = connect(null, {
  closeNavigation,
  openNavigation,
})(({ closeNavigation, openNavigation }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  if (matches) {
    closeNavigation();
  } else {
    openNavigation();
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
            <Route path="/test" component={TestView} />
            <Route path="/photo" component={PhotoView} />
          </Switch>
          <PageFooter />
        </main>
      </SnackbarProvider>
    </div>
  );
});
