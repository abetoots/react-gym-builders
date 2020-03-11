import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { REFRESH_TOKEN, JWT_AUTH_EXPIRATION, GYM_ROLE } from "./constants";

/**
 *Ensures that all values from a given array are unique
 * @returns An array containing the unique values
 * @param {Array} array
 */
export const uniqueRoutes = array => {
  //check if param is array
  if (!Array.isArray(array)) {
    return;
  }

  const s = new Set();
  const a = [];

  array.forEach(itm => {
    //check if Set does not have the value, then add them to Set and the array to be returned
    if (!s.has(itm.path)) {
      s.add(itm.path);
      a.push(itm);
    }
  });

  return a;
};

export const uniqArray = array => {
  //check if param is array
  if (!Array.isArray(array)) {
    return;
  }

  const s = new Set();
  const a = [];

  array.forEach(itm => {
    //check if Set does not have the value, then add them to Set and the array to be returned
    if (!s.has(itm)) {
      s.add(itm);
      a.push(itm);
    }
  });

  return a;
};

// Converts a Date Object and returns a string in YYYYMMDD format
//For SQL databases and to be consistent with ACF plugin
export const formatDateToYYYYMMDD = value => {
  const formatter = new Intl.DateTimeFormat(undefined, {
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(value);

  //year in YYYY
  let y = value.getFullYear();
  let m;
  let d;
  parts.forEach(({ type, value }) => {
    if (type === "month") {
      m = value; //month in MM
    }
    if (type === "day") {
      d = value; //day in DD
    }
  });

  return `${y + m + d}`;
};

export const updateObject = (oldState, newProperties) => {
  return {
    ...oldState,
    ...newProperties
  };
};

export const isDate = input => {
  if (Object.prototype.toString.call(input) === "[object Date]") return true;
  return false;
};

export const isFunction = value =>
  value &&
  (Object.prototype.toString.call(value) === "[object Function]" ||
    "function" === typeof value ||
    value instanceof Function);

export const isObject = function(obj) {
  var type = typeof obj;
  return type === "function" || (type === "object" && !!obj);
};

export const fileSizeExceeds = (file, validSize) => {
  if (file.constructor !== File) {
    return new Error("Not a file");
  }

  if (typeof validSize !== "number") {
    return new Error("Not a number");
  }
  //Check by megabytes
  //True if filesize bigger than valid size * 1024
  return Math.round(file.size / 1024) >= 1024 * validSize;
};

export const cleanupLocalStorage = () => {
  console.log("Cleanup localstorage...");
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(JWT_AUTH_EXPIRATION);
  localStorage.removeItem(GYM_ROLE);
  console.log(`Removed ${(REFRESH_TOKEN, JWT_AUTH_EXPIRATION, GYM_ROLE)}`);
};

export const setupLocalStorage = data => {
  console.log("Setup localstorage...");
  localStorage.setItem(REFRESH_TOKEN, data.login[REFRESH_TOKEN]);
  localStorage.setItem(
    JWT_AUTH_EXPIRATION,
    data.login.user[JWT_AUTH_EXPIRATION]
  );
  localStorage.setItem(GYM_ROLE, data.login.user[GYM_ROLE]);
};

// this is a handy function for any component we need to test
// that relies on the router being in context
export const renderWithRouter = (
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
};
