import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { DashboardHeader } from "Components/Headers/DashboardHeader";
import { MenuDrawer } from "Components/Drawers/MenuDrawer";
import { CategoryView } from "Components/PageView/CategoryView";
import { SubCategoryView } from "Components/PageView/SubCategoryView";
import { SubCategoryEditView } from "Components/PageView/SubCategoryEditView";
import { TopicView } from "Components/PageView/TopicView";
import { TopicEditView } from "Components/PageView/TopicEditView";
import { ReferenceView } from "Components/PageView/ReferenceView";
import { TaskView } from "Components/PageView/TaskView";
import { PageFooter } from "Components/Layouts/Footer";
import { TestView } from "Components/PageView/TestView";
import { DailyForecastView } from "Components/PageView/DailyForecastView";

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

export const DashboardController = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.root}>
      <DashboardHeader />
      <MenuDrawer />
      <SnackbarProvider
        maxSnack={1}
        dense
        preventDuplicate
        anchorOrigin={
          matches
            ? { horizontal: "center", vertical: "bottom" }
            : { horizontal: "left", vertical: "top" }
        }
        autoHideDuration={2500}
      >
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <Redirect
                    to={{
                      pathname: "/tech/react",
                      state: { title: "Technical References" },
                    }}
                  />
                );
              }}
            />
            <Route path="/tech" component={ReferenceView} />
            <Route path="/categoryList" component={CategoryView} />
            <Route path="/subCategoryList" component={SubCategoryView} />
            <Route
              path="/editSubCategory/:id"
              component={SubCategoryEditView}
            />
            <Route path="/topicList" component={TopicView} />
            <Route path="/editTopic/:id" component={TopicEditView} />
            <Route path="/task" component={TaskView} />
            <Route path="/test" component={TestView} />
            <Route path="/forecast" component={DailyForecastView} />
          </Switch>
          <PageFooter />
        </main>
      </SnackbarProvider>
    </div>
  );
};
