import { useState } from "react";
//TODO comments
export const initForm = inputs => {
  let initialState = {};
  inputs.forEach(input => {
    initialState[input.key] = input.initialValue;
  });

  const useFormState = () => {
    const [state, setState] = useState(initialState);

    const updater = (stateKey, value, toReset = null) => {
      if (toReset) {
        if (Array.isArray(toReset)) {
          let valuesToReset = {};
          toReset.forEach(key => {
            valuesToReset[key] = initialState[key];
          });
          setState({ ...state, [stateKey]: value, ...valuesToReset });
        } else {
          setState({
            ...state,
            [stateKey]: value,
            [toReset]: initialState[toReset]
          });
        }
      } else {
        setState({ ...state, [stateKey]: value });
      }
    };

    return [state, updater];
  };

  return useFormState;
};
