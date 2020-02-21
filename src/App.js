import React, { useEffect, useState } from "react";

//Routing
import { BrowserRouter } from "react-router-dom";

//Components
import RoutesList from "./core/RoutesList/RoutesList";
import BoundaryUI from "./hoc/BoundaryUI/BoundaryUI";
import BoundaryRedirect from "./hoc/BoundaryRedirect/BoundaryRedirect";

//Shared, globals, utils
import configureTokenStore from "./hooks/store/token-store";
import { useStore } from "./hooks/store/store";
import { list } from "./util/link-list";
import { uniqueRoutes } from "./util/util";
import { useRefreshToken, REFTOKEN } from "./hooks/wp-graphql-token";

configureTokenStore("tokenStore");

const App = () => {
  const routes = uniqueRoutes(list.flat());
  const [state, dispatch] = useStore();

  const [
    { loadingRefresh, called },
    { successRefresh, data },
    errorRefresh,
    startRefresh
  ] = useRefreshToken();

  //ComponentDidMount
  useEffect(() => {
    //if we found a refresh token
    if (localStorage.getItem(REFTOKEN)) {
      startRefresh();
    }

    if (successRefresh) {
      dispatch("LOGIN_SUCCESS", data);
    }
  }, [successRefresh]);

  return (
    <BrowserRouter>
      <BoundaryUI loading={loadingRefresh}>
        <RoutesList routes={routes} />
        <BoundaryRedirect if={called && successRefresh} ifTrueTo="/dashboard" />
        <BoundaryRedirect if={called && errorRefresh} ifTrueTo="/login" />
        <BoundaryRedirect
          if={!state.calledLogin && !state.loggedIn}
          ifTrueTo="/login"
        />
      </BoundaryUI>
    </BrowserRouter>
  );
};

export default App;
