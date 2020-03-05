import { initStore } from "./store";
import { tokenCache } from "../auth";
import { cleanupLocalStorage } from "../../misc/util";

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
  errorLogin: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  },
  dataLogin: []
};

const configureStore = listenerKey => {
  const actions = {
    LOGIN_START: state => ({ loadingLogin: true, calledLogin: true }),
    LOGIN_SUCCESS: (state, data) => ({
      ...initialState,
      loadingLogin: false,
      dataLogin: data,
      loggedIn: true
    }),
    LOGIN_FAIL: (state, errorDispatch) => {
      console.log("[Dispatch Error]: LOGIN_FAIL ", [errorDispatch.errorDev]);
      return {
        ...initialState,
        loadingLogin: false,
        errorLogin: { ...state.errorLogin, ...errorDispatch }
      };
    },
    LOGOUT: state => {
      tokenCache.token = null;
      cleanupLocalStorage();
      return { loggedIn: false, dataLogin: [], calledLogin: false };
    }
  };

  initStore(initialState, actions, listenerKey);
};

export default configureStore;
