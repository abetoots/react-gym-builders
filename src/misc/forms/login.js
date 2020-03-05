import { initForm } from "./form-core";

const inputs = [
  {
    key: "login",
    label: "Login",
    elType: "input",
    elementConfig: {
      type: "text",
      required: true,
      autoComplete: "username"
    },
    initialValue: ""
  },
  {
    key: "password",
    label: "Password",
    elType: "input",
    elementConfig: {
      type: "password",
      required: true,
      autoComplete: "current-password"
    },
    initialValue: ""
  }
];
export const useFormState = initForm(inputs);

export default inputs;
