import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { ReduxProvider } from "Redux/ReduxProvider";
import { ThemeProvider } from "Styles/ThemeProvider";
import { DashboardController } from "Components/DashboardController";
import config from "Config/config";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "Context/authContext";

const URI = config.APOLLO_CLIENT_URI;
console.log(URI);

const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

// const client = new ApolloClient({
//   uri: URI,
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <ReduxProvider>
          <ThemeProvider>
            <BrowserRouter>
              <DashboardController />
            </BrowserRouter>
          </ThemeProvider>
        </ReduxProvider>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
