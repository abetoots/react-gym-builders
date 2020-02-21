import { useState } from "react";

export const initForm = inputs => {
  let initialState = {};
  inputs.forEach(input => {
    initialState[input.key] = input.initialValue;
  });

  const useFormState = () => {
    const [state, setState] = useState(initialState);

    const update = (stateKey, value) => {
      setState({ ...state, [stateKey]: value });
    };

    return [state, update];
  };

  const getHandler = listener => {
    const handler = (inputKey, value) => {
      listener(inputKey, value);
    };

    return handler;
  };

  return [useFormState, getHandler];
};
