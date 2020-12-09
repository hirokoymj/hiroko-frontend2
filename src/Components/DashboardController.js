import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { DashboardHeader } from "Components/Headers/DashboardHeader";
import { MenuDrawer } from "Components/Drawers/MenuDrawer";
import {
  Home,
  CategoryList,
  SubCategoryList,
  TopicList,
} from "Components/Home";

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

  return (
    <div className={classes.root}>
      <DashboardHeader />
      <MenuDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/categoryList" component={CategoryList} />
          <Route path="/subCategoryList" component={SubCategoryList} />
          <Route path="/topicList" component={TopicList} />
        </Switch>
      </main>
    </div>
  );
};
