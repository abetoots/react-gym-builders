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

export const isDate = input => {
  if (Object.prototype.toString.call(input) === "[object Date]") return true;
  return false;
};

export const isFunction = value =>
  value &&
  (Object.prototype.toString.call(value) === "[object Function]" ||
    "function" === typeof value ||
    value instanceof Function);

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
