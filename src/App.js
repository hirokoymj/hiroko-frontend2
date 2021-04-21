import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";

import { ReduxProvider } from "Redux/ReduxProvider";
import { ThemeProvider } from "Styles/ThemeProvider";
import { DashboardController } from "Components/DashboardController";
import config from "Config/config";

const URI = config.APOLLO_CLIENT_URI;
console.log(URI);

const client = new ApolloClient({
  uri: URI,
});

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ReduxProvider>
          <ThemeProvider>
            <DashboardController />
          </ThemeProvider>
        </ReduxProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
