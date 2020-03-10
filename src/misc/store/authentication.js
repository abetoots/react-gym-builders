import { initStore } from "./store-core";
import { tokenCache } from "../hooks/auth";
import { cleanupLocalStorage } from "../shared/helper-funcs";

/**
 * Think of this as a reducer similar to redux
 * How to use:
 * In redux, instead of initializing the store by a Provider, we just call the configure function to set up our initial state and actions
 * After calling the configure, we can now expect our initialState to be merged with the globalState.
 * We can also now expect the actions to be defined, we can now dispatch them by getting the dispatch from useStore.
 */

const initialState = {
  calledAuth: false,
  pendingAuth: false,
  authenticated: false,
  errorAuth: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  },
  dataAuth: []
};

const configureStore = listenerKey => {
  const actions = {
    AUTH_START: state => ({ pendingAuth: true, calledAuth: true }),
    AUTH_SUCCESS: (state, data) => {
      console.log("[Dispatch Success]: AUTH_SUCCESS", [data]);
      return {
        ...initialState, //!careful that you only reset if you don't rely on other values
        calledAuth: true,
        pendingAuth: false,
        dataAuth: data,
        authenticated: true
      };
    },
    AUTH_FAIL: (state, errorDispatch) => {
      console.log("[Dispatch Error]: AUTH_FAIL ", [errorDispatch.errorDev]);
      return {
        ...initialState,
        calledAuth: true,
        pendingAuth: false,
        errorAuth: { ...state.errorAuth, ...errorDispatch }
      };
    },
    LOGOUT: state => {
      tokenCache.token = null;
      cleanupLocalStorage();
      return { authenticated: false, dataAuth: [], calledAuth: false };
    }
  };

  initStore(initialState, actions, listenerKey);
};

export default configureStore;
