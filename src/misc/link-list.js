import { tokenCache } from "../hooks/wp-graphql-token";

import Login from "../core/Login/Login";
import Logout from "../core/Logout/Logout";
import Register from "../core/Register/Register";
import GraphQL from "../core/GraphiQlWrap/GraphiQlWrap";
import asyncComponent from "../hoc/asyncComponent/asyncComponent";

//Lazy load all components except the component for root or home
const AsyncDxGrid = asyncComponent(() => {
  return import("../core/DXGrid/DXGrid");
});

/**
 * How to use:
 * Adding a menu here automatically adds them to our RoutesList component
 * These objects are simply mapped to a <Route/> component
 * You can pass them to a Menu component knowing that the routes are taken care of.
 */

//!Do not delete. This serves as a fallback linklist
export const defaultLinkList = [
  {
    path: "/login",
    exact: true,
    component: Login,
    label: "Login"
  },
  {
    path: "/dashboard",
    exact: true,
    component: AsyncDxGrid,
    label: "Dashboard"
  },
  {
    path: "/logout",
    exact: true,
    component: Logout,
    label: "Logout"
  }
];

export const authLinkList = [
  {
    path: "/dashboard",
    exact: true,
    component: AsyncDxGrid,
    label: "Dashboard"
  },
  {
    path: "/logout",
    exact: true,
    component: Logout,
    label: "Logout"
  },
  {
    path: "/register",
    exact: true,
    component: Register,
    label: "Register"
  }
];

export const unAuthLinkList = [
  {
    path: "/login",
    exact: true,
    component: Login,
    label: "Login"
  }
];

export const getLinkList = () => {
  return tokenCache.token ? authLinkList : unAuthLinkList;
};

export const list = [defaultLinkList, authLinkList, unAuthLinkList];

if (process.env.NODE_ENV === "development") {
  list.forEach(li => {
    li.push({
      path: "/__graphiql",
      exact: true,
      component: GraphQL,
      label: "GraphiQlIDE"
    });
  });
}
