import { useState, useEffect } from "react";

//Follow this auth flow : https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_persist
// For WPGraphQl , simplified : https://github.com/NeverNull/gatsby-apollo-wpgraphql-jwt-starter/issues/1

//!Be careful when setting tokenCache as some redirects depend on this
//Example: we set the tokenCache causing a redirect, problem is, we write some code after it like setSomething()
// this will trigger an error since we have already been redirected (component is unmounted already) therefore
// causing something like "Warning: Can't perform a React state update on an unmounted component"
export const tokenCache = {};

export const EXPDATE = "expirationDate";
export const REFTOKEN = "refreshToken";

const refreshMutation = `
    mutation RefreshToken {
      refreshJwtAuthToken(
        input: { clientMutationId: "", jwtRefreshToken: "${localStorage.getItem(
          REFTOKEN
        )}" }
      ) {
        authToken
      }
    }
  `;

export const useLazyLoginMutation = dispatch => {
  let query;
  const setQuery = customQuery => {
    query = customQuery;
  };

  const fetchToken = () => {
    fetch(BASE_URL + "graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then(data => {
        console.log("FetchAPI: Done!", [data]);
        localStorage.setItem(REFTOKEN, data.data.login.refreshToken);
        localStorage.setItem(EXPDATE, data.data.login.user.jwtAuthExpiration);
        tokenCache.token = data.data.login.authToken;
        silentlyRefresh();
        dispatch("LOGIN_SUCCESS", data);
      })
      .catch(err => {
        console.log("FetchAPI: Error!", [err]);
        dispatch("LOGIN_FAIL", err);
      });
  };

  const startLogin = () => {
    console.log("Fetch API: fetching...");
    dispatch("LOGIN_START");
    fetchToken();
  };

  return [startLogin, setQuery];
};

const setNewExpirationDate = () => {
  //set the new expiry date as 4.5 minutes from now IN SECONDS since epoch time
  localStorage.setItem(
    EXPDATE,
    new Date(
      //date now in milliseconds since epoch time + 4.5 minutes in ms
      new Date().getTime() + 270000
    ).getTime() / 1000
  ); // converted to seconds since epoch time)
};

// A refresh without loading and error hints, simply for background task. We DONT
// interfere with the UX
const backgroundRefresh = async () => {
  console.log("Refreshing in the background ...");
  try {
    const res = await fetch(BASE_URL + "graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: refreshMutation
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res.json();
    });
    //We got a valid token, user can now have access UI
    //No more UI loading hint, only silent refreshes from here on out
    setNewExpirationDate();
    console.log(res);
    tokenCache.token = res.data.refreshJwtAuthToken.authToken;
    silentlyRefresh();
  } catch (err) {
    console.log(err);
    //TODO we dont want to interrupt UX when the background refresh fails
    //TODO maybe handle this idk like logout
  }
};

let timerId;
let delay;
const silentlyRefresh = () => {
  console.log("Silently refreshing ...");
  //we expect the date to be stored as seconds since epoch time
  //since settimeout talks in milliseconds, we get the remaining milliseconds (hence multiplying to 1000)
  //expiration date in ms since epoch - Date now in ms since epoch = remaining milliseconds
  delay = new Date(localStorage.getItem(EXPDATE) * 1000) - new Date().getTime();
  timerId = setTimeout(backgroundRefresh, delay);
};

/**
 * Handle refreshing of auth token
 * Success: We start a silent refresh in the background
 * Error: Handle error, fetch a new auth token
 *
 * @param {String} refreshToken
 */
export const useRefreshToken = () => {
  const [loading, setLoading] = useState({
    loadingRefresh: false,
    called: false
  });
  const [success, setSuccess] = useState({ successRefresh: false, data: [] });
  const [errorRefresh, setErrorLogin] = useState("");

  // We force the user to wait since a token was found so we give out loading hints.
  const refreshWithHints = async () => {
    console.log("Actively refreshing ...");
    try {
      const res = await fetch(BASE_URL + "graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: refreshMutation
        })
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      });

      //We got a valid token, user can now have access to UI
      //No more UI loading hint, only silent refreshes from here on out
      setNewExpirationDate();
      tokenCache.token = res.data.refreshJwtAuthToken.authToken;
      silentlyRefresh();
      setSuccess({ successRefresh: true, data: res.data });
    } catch (err) {
      console.log("Active refresh error: ", [err]);
      //Maybe invalid refresh token. Redirect to login
    }
  };

  useEffect(() => {
    if (success.successRefresh || errorRefresh) {
      console.log(loading);
      console.log(success);
      setLoading({ ...loading, loadingRefresh: false });
    }
  }, [success, errorRefresh]);

  const startRefresh = () => {
    refreshWithHints();
    setLoading({ loadingRefresh: true, called: true });
  };

  return [loading, success, errorRefresh, startRefresh];
};
