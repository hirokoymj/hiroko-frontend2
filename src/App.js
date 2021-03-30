import React from "react";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "@apollo/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { BrowserRouter } from "react-router-dom";
import { ReduxProvider } from "Redux/ReduxProvider";
import { ThemeProvider } from "Styles/ThemeProvider";
import { DashboardController } from "Components/DashboardController";
import { UploadForm } from "Components/PageView/UploadForm";

const URI_PRODUCTION = "https://hirokoymj-backend.herokuapp.com/";
const URI_LOCAL = "http://localhost:4000/";
// const client = new ApolloClient({
//   uri: URI_PRODUCTION,
// });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: "http://localhost:4000/graphql" }),
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
