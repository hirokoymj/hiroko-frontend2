import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { ReduxProvider } from "./Redux/ReduxProvider";
// import { TopicFormPage } from "./Components/Tech/TopicFormPage";
// import { TopicEditFormPage } from "./Components/Tech/TopicEditFormPage";
import { ThemeProvider } from "./Styles/ThemeProvider";
import { CategoryTable } from "./Components/Tech/CategoryTable";

const client = new ApolloClient({
  uri: "https://hirokoymj-backend.herokuapp.com/",
});

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <CategoryTable />
    </div>
  );
};

const AppRouter = () => (
  <Switch>
    <Route path="/" component={Home} exact={true} />
  </Switch>
);

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ReduxProvider>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </ReduxProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
