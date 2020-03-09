import { useState, useEffect } from "react";
import PropTypes from "prop-types";
/**
 * Guiding principle: Similar to redux, we want to share logic and data
 * 1) A global state
 * 2) Listeners should be full of functions that we can call to update all components that are using this hook
 */
let globalState = {};
let listeners = {};
let actions = {};

/**
 *
 */
export const useStore = listenTo => {
  //Every component that uses this hook gets its own setState function
  const [, setState] = useState(globalState);

  //Every component that uses this hook gets the dispatch function
  //Like in redux, when dispatching an action, we expect a type and any payload we might also forward
  //unlike redux, instead of expecting an object like this ({type: 'some action type', ...payload})
  // we pass the action type as the first parameter instead
  const dispatch = (actionType, payload) => {
    //similar to an action in a reducer, we expect that action to return the new state when called
    const newState = actions[actionType](globalState, payload);
    globalState = { ...globalState, ...newState };

    //trigger the appropriate listeners (setState functions) based on 'listenTo' to update with the new global state
    //if an array of listener keys...
    if (Array.isArray(listenTo)) {
      //...for each key
      listenTo.forEach(key => {
        //...we trigger all the listeners under that key
        listeners[key].forEach(listener => {
          //...to update with the new global state
          listener(globalState);
        });
      });
    } else if (!listenTo) {
      //if not defined, then we want to trigger ALL listeners
      //for every key of our listeners object...
      for (let key of Object.keys(listeners)) {
        //...we trigger all the listeners under that key
        listeners[key].forEach(listener => {
          listener(globalState);
        });
      }
    } else if (typeof listenTo === "string") {
      //Default behavior is 'listenTo' is a single key string
      //Only the listeners under that key ...
      listeners[listenTo].forEach(listener => {
        //...will now update using the new global state
        listener(globalState);
      });
      //causing a rerender for all components subscribed to the same 'listenTo' key/keys
    }
  };

  //When a component that uses this hook mounts (componentDidMount), register it's own setState to the appropriate
  //part of listeners we want to listen to based on 'listenTo' param
  useEffect(() => {
    //if an array of listener keys...
    if (Array.isArray(listenTo)) {
      //...for each key
      listenTo.forEach(key => {
        //subscribe our listener to that key
        listeners[key].push(setState);
      });
    } else if (!listenTo) {
      //if not defined, then we want to subscribe to ALL listener keys
      //for every key of our listeners object...
      for (let key of Object.keys(listeners)) {
        //subscribe our listener to that key
        listeners[key].push(setState);
      }
    } else if (typeof listenTo === "string") {
      //Default behavior is 'listenTo' is a single key string
      //subscribe our listener to that key
      listeners[listenTo].push(setState);
    }

    // Cleanup: When a component that uses this hook unmounts, remove that component's setState from listeners
    return () => {
      //if an array of listener keys...
      if (Array.isArray(listenTo)) {
        //...for each key
        listenTo.forEach(key => {
          //sunubscribe our listener from that key
          listeners[key] = listeners[key].filter(li => li !== setState);
        });
      } else if (!listenTo) {
        //if not defined, then we want to unsubscribe from ALL listener keys
        //for every key of our listeners object...
        for (let key of Object.keys(listeners)) {
          //subscribe our listener to that key
          listeners[key] = listeners[key].filter(li => li !== setState);
        }
      } else if (typeof listenTo === "string") {
        //Default behavior is 'listenTo' is a single key string
        //unsubscribe our listener from that key
        listeners[listenTo] = listeners[listenTo].filter(li => li !== setState);
      }
    };
  }, [setState]);

  return [globalState, dispatch];
};

//In redux, this is basically the reducer. Instead of exporting this, we call it instead.
export const initStore = (initialState, userActions, listenerKey) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };

  listeners[listenerKey] = [];
};
initStore.propTypes = {
  initialState: PropTypes.object,
  userActions: PropTypes.func,
  listenerKey: PropTypes.string
};

export const combineStore = stores => {
  for (let [key, configurateStore] of Object.entries(stores)) {
    configurateStore(key);
  }
};
combineStore.propTypes = {
  stores: PropTypes.objectOf(PropTypes.func)
};
