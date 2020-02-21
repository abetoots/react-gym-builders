import { initForm } from "./form-core";

const inputs = [
  {
    key: "login",
    label: "Login",
    htmlTag: "input",
    elementConfig: {
      type: "text",
      required: true
    },
    initialValue: ""
  },
  {
    key: "password",
    label: "Password",
    htmlTag: "input",
    elementConfig: {
      type: "password",
      required: true
    },
    initialValue: ""
  }
];
export const [useFormState, getHandler] = initForm(inputs);

export default inputs;
