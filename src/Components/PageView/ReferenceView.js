import React, { useState } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ReferenceListView } from "Components/PageView/ReferenceListView";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  activeTab: {
    backgroundImage: `linear-gradient(${theme.palette.secondary.light} 0%,${theme.palette.secondary.dark} 100%)`,
    color: theme.palette.secondary.contrastText,
  },
  tab: {
    textTransform: "none",
    fontSize: "1rem",
  },
  indicatorColor: theme.palette.secondary.dark,
}));

export const ReferenceView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles({ activeTab });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor={classes.indicatorColor}
          textColor="#000"
          variant="scrollable"
          scrollButtons="on"
          fullWidth>
          <Tab
            label="React"
            component={Link}
            to="/tech/react"
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 0,
            })}
          />
          <Tab
            label="JavaScript"
            component={Link}
            to="/tech/js"
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 1,
            })}
          />
          <Tab
            label="GraphQL"
            component={Link}
            to="/tech/graphQL"
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 2,
            })}
          />
          <Tab
            label="Git"
            component={Link}
            to="/tech/git"
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 3,
            })}
          />
          <Tab
            label="HTML/CSS"
            component={Link}
            to="/tech/html"
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 4,
            })}
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
