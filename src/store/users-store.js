import { initStore } from "./store";

const initialState = {
  registeredNewUser: false,
  registering: false,
  registered: false,
  errorRegister: {
    //errors meant for the developer
    errorDev: null,
    //errors meant for the user UI
    output: ""
  }
};

const configureStore = listenerKey => {
  const actions = {
    REGISTER_START: () => ({ registering: true }),
    REGISTER_SUCCESS: () => ({
      ...initialState, //!careful that you only reset if you don't rely on other values
      registering: false,
      registered: true,
      registeredNewUser: true
    }),
    REGISTER_FAIL: (state, errorDispatch) => {
      console.log("[Dispatch Error]: REGISTER_FAIL ", [errorDispatch.errorDev]);
      return {
        ...initialState,
        errorRegister: { ...state.errorRegister, ...errorDispatch }
      };
    },
    REFETCHED_NEW_USER: () => ({ registeredNewUser: false })
  };

  initStore(initialState, actions, listenerKey);
};

export default configureStore;
