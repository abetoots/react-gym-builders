import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import "./fontawesome";
import "./typography";

//Start components
import App from "./App";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

//shared
import { tokenCache } from "./misc/hooks/auth";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  request: operation => {
    if (tokenCache.token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${tokenCache.token}`
        }
      });
    }
  }
});

const target = document.querySelector("#root");
if (target) {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    target
  );
}
