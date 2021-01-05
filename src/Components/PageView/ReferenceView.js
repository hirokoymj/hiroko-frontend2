import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ReferenceListView } from "Components/PageView/ReferenceListView";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  activeTab: {
    backgroundImage: "linear-gradient(#f8f6f6 0%,#e8eef4 100%)",
  },
  tab: {
    textTransform: "none",
    fontSize: "1rem",
  },
}));

///==== TODO: replace Tab to TabLink
const TabLink = ({ to, className, label }) => {
  return (
    <Tab
      label={label}
      component={Link}
      to={{ pathname: to, state: { title: "Technical References" } }}
      className={className}
    />
  );
};

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
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab
            label="React"
            component={Link}
            to={{
              pathname: "/tech/react",
              state: { title: "Technical References" },
            }}
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 0,
            })}
          />
          <Tab
            label="JavaScript"
            component={Link}
            to={{
              pathname: "/tech/js",
              state: { title: "Technical References" },
            }}
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 1,
            })}
          />
          <Tab
            label="GraphQL"
            component={Link}
            to={{
              pathname: "/tech/graphQL",
              state: { title: "Technical References" },
            }}
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 2,
            })}
          />
          <Tab
            label="HTML/CSS"
            component={Link}
            to={{
              pathname: "/tech/html",
              state: { title: "Technical References" },
            }}
            className={clsx(classes.tab, {
              [classes.activeTab]: activeTab === 3,
            })}
          />
        </Tabs>
      </AppBar>
      <Switch>
        <Route
          path="/tech/:abbr"
          render={() => <ReferenceListView title="Technical References" />}
        />
      </Switch>
    </div>
  );
};
