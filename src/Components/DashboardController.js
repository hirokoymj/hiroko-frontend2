import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { DashboardHeader } from "Components/Headers/DashboardHeader";
import { MenuDrawer } from "Components/Drawers/MenuDrawer";
import { Home, TopicList } from "Components/Home";
import { CategoryView } from "Components/PageView/CategoryView";
import { CategoryEditView } from "Components/PageView/CategoryEditView";
import { SubCategoryView } from "Components/PageView/SubCategoryView";
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
            <Route path="/" component={Home} exact={true} />
            <Route path="/categoryList" component={CategoryView} />
            <Route path="/editCategory/:id" component={CategoryEditView} />
            <Route path="/subCategoryList" component={SubCategoryView} />
            <Route path="/topicList" component={TopicList} />
          </Switch>
        </main>
      </SnackbarProvider>
    </div>
  );
};
