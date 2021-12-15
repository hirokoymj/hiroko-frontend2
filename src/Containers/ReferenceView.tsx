import React, { useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ReferenceListView } from "Containers/ReferenceListView";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  tabsRoot: {
    color: "#000",
    fontWeight: "bold",
  },
  indicatorColor: {
    background: `${theme.palette.secondary.dark}`,
  },
  tab: {
    textTransform: "none",
    fontSize: "1.1rem",
  },
  activeTab: {
    backgroundImage: `linear-gradient(${theme.palette.secondary.light} 0%,${theme.palette.secondary.dark} 100%)`,
    color: theme.palette.secondary.contrastText,
  },
}));

export const ReferenceView = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const classes = useStyles();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="on"
          aria-label="techTabs"
          classes={{
            root: classes.tabsRoot,
            indicator: classes.indicatorColor,
          }}>
          <Tab
            label="React"
            component={Link}
            to="/tech/react"
            value={0}
            classes={{
              root: clsx(classes.tab, activeTab === 0 && classes.activeTab),
            }}
          />
          <Tab
            label="JavaScript"
            component={Link}
            to="/tech/js"
            value={1}
            classes={{
              root: clsx(classes.tab, activeTab === 1 && classes.activeTab),
            }}
          />
          <Tab
            label="GraphQL"
            component={Link}
            to="/tech/graphQL"
            value={2}
            classes={{
              root: clsx(classes.tab, activeTab === 2 && classes.activeTab),
            }}
          />
          <Tab
            label="Git"
            component={Link}
            to="/tech/git"
            value={3}
            classes={{
              root: clsx(classes.tab, activeTab === 3 && classes.activeTab),
            }}
          />
          <Tab
            label="HTML/CSS"
            component={Link}
            to="/tech/html"
            value={4}
            classes={{
              root: clsx(classes.tab, activeTab === 4 && classes.activeTab),
            }}
          />
        </Tabs>
      </AppBar>
      <Switch>
        <Route path="/tech" exact>
          <Redirect to="/tech/react" />
        </Route>
        <Route path="/tech/:abbr" component={ReferenceListView} />
      </Switch>
    </div>
  );
};
