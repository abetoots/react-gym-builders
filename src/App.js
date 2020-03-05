import React, { useEffect, useState } from "react";

//Routing
import { BrowserRouter } from "react-router-dom";

//Components
import RoutesList from "./core/RoutesList/RoutesList";
import BoundaryUI from "./hoc/BoundaryUI/BoundaryUI";
import BoundaryRedirect from "./hoc/BoundaryRedirect/BoundaryRedirect";

//Shared, globals, utils
import tokenStore from "./store/token-store";
import userStore from "./store/users-store";
import { useStore, combineStore } from "./store/store";
import { list } from "./misc/link-list";
import { uniqueRoutes } from "./misc/util";
import { useRefreshToken } from "./hooks/auth";
import { REFRESH_TOKEN } from "./misc/constants";

combineStore({
  token: tokenStore,
  users: userStore
});

const App = () => {
  const routes = uniqueRoutes(list.flat());
  const [globalState, dispatch] = useStore("token");
  const [mounted, setMounted] = useState(false);

  const [
    startRefresh,
    { loadingRefresh, called },
    { successRefresh, data },
    { errorRefresh }
  ] = useRefreshToken();

  useEffect(() => {
    //if we found a refresh token
    if (successRefresh) {
      dispatch("LOGIN_SUCCESS", data);
    }
  }, [successRefresh]);
  //ComponentDidMount
  //run only once
  useEffect(() => {
    if (localStorage.getItem(REFRESH_TOKEN)) {
      startRefresh();
    }
    setMounted(true);
  }, []);

  return (
    <BrowserRouter>
      <BoundaryUI loading={loadingRefresh}>
        {mounted ? <RoutesList routes={routes} /> : ""}
        <BoundaryRedirect if={called && successRefresh} ifTrueTo="/dashboard" />
        <BoundaryRedirect if={called && errorRefresh} ifTrueTo="/login" />
        <BoundaryRedirect
          if={!globalState.calledLogin && !globalState.loggedIn}
          ifTrueTo="/login"
        />
      </BoundaryUI>
    </BrowserRouter>
  );
};

export default App;
