import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ReferenceListView } from "Components/PageView/ReferenceListView";

export const ReferenceView = () => {
  const [activeTab, setActiveTab] = useState(0);

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
          <Tab label="React" component={Link} to="/tech/react" />
          <Tab label="JavaScript" component={Link} to="/tech/js" />
          <Tab label="GraphQL" component={Link} to="/tech/graphQL" />
          <Tab label="HTML/CSS" component={Link} to="/tech/html" />
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
