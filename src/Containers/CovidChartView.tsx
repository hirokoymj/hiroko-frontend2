import React, { useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { CovidChartCAView } from "Containers/CovidChartCAView";
import { CovidChartSearchView } from "Containers/CovidChartSearchView";
import { ChartTabNames } from "Enums/TabNames";
import { CovidChartTotalView } from "Containers/CovidChartTotalView";

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

export const CovidChartView = () => {
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
          aria-label="covidChartTabs"
          classes={{
            root: classes.tabsRoot,
            indicator: classes.indicatorColor,
          }}>
          <Tab
            label={ChartTabNames.CA}
            component={Link}
            to="/covid19/ca"
            value={0}
            classes={{
              root: clsx(classes.tab, activeTab === 0 && classes.activeTab),
            }}
          />
          <Tab
            label={ChartTabNames.TOTALCASES}
            component={Link}
            to="/covid19/total"
            value={1}
            classes={{
              root: clsx(classes.tab, activeTab === 1 && classes.activeTab),
            }}
          />
          <Tab
            label={ChartTabNames.SEARCH}
            component={Link}
            to="/covid19/search"
            value={2}
            classes={{
              root: clsx(classes.tab, activeTab === 2 && classes.activeTab),
            }}
          />
        </Tabs>
      </AppBar>
      <Switch>
        <Route path="/covid19" exact>
          <Redirect to="/covid19/ca" />
        </Route>
        <Route path="/covid19/ca" component={CovidChartCAView} />
        <Route path="/covid19/total" component={CovidChartTotalView} />
        <Route path="/covid19/search" component={CovidChartSearchView} />
      </Switch>
    </div>
  );
};
