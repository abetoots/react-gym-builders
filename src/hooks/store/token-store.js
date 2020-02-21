import { initStore } from "./store";
import { tokenCache, REFTOKEN, EXPDATE } from "../wp-graphql-token";

/**
 * Think of this as a reducer similar to redux
 * How to use:
 * In redux, instead of initializing the store by a Provider, we just call the configure function to set up our initial state and actions
 * After calling the configure, we can now expect our initialState to be merged with the globalState.
 * We can also now expect the actions to be defined, we can now dispatch them by getting the dispatch from useStore.
 */

const initialState = {
  loadingLogin: false,
  calledLogin: false,
  loggedIn: false,
  errorLogin: "",
  data: []
};

const configureTokenStore = () => {
  const actions = {
    LOGIN_START: state => ({ loadingLogin: true, calledLogin: true }),
    LOGIN_SUCCESS: (state, data) => ({
      loadingLogin: false,
      data: data,
      loggedIn: true
    }),
    LOGIN_FAIL: (state, err) => ({ loadingLogin: false, errorLogin: err }),
    LOGOUT: state => {
      tokenCache.token = null;
      localStorage.removeItem(REFTOKEN);
      localStorage.removeItem(EXPDATE);
      return { loggedIn: false, data: [], calledLogin: false };
    }
  };

  initStore(initialState, actions);
};

export default configureTokenStore;
