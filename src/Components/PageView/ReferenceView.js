import React, { useState } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  useParams,
  Link,
  Redirect,
} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ReferenceListView } from "Components/PageView/ReferenceListView";

export const ReferenceView = () => {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="JavaScript" component={Link} to="/tech/javascript" />
          <Tab label="HTML" component={Link} to="/tech/html" />
          <Tab label="git" component={Link} to="/tech/git" />
        </Tabs>
      </AppBar>
      <Switch>
        <Route path="/tech/:category" component={ReferenceListView} />
      </Switch>
    </div>
  );
};
