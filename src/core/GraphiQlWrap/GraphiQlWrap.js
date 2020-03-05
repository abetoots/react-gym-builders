import React from "react";
import GraphiQL from "graphiql";
import fetch from "isomorphic-fetch";
import "graphiql/graphiql.css";

import Layout from "../../components/layout";

const GraphiQlWrap = props => {
  const fetcher = async graphQlParams => {
    const response = await fetch(BASE_URL + "/graphql", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphQLParams),
      credentials: "same-origin"
    });
    return await response.json();
  };

  return (
    <Layout>
      <GraphiQL style={{ minHeight: "100vh" }} fetcher={fetcher} />
    </Layout>
  );
};

export default GraphiQlWrap;
