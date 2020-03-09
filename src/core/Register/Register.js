import React from "react";

//Components
import Layout from "../../components/layout";
import Form from "../../components/UI/Form/Form";
import Input from "../../components/UI/Input/Input";

import { useStore } from "../../misc/store/store-core";
import inputs, { useFormState } from "../../misc/forms/register";
import { tokenCache } from "../../misc/hooks/auth";
import { useLazyFetchQuery } from "../../misc/hooks/util";
import {
  getCreateMemberMutation,
  GYM_MEMBER
} from "../../misc/shared/constants";

const Register = props => {
  const [formState, setFormState] = useFormState();
  const [globalState, dispatch] = useStore("users");

  const [createMember] = useLazyFetchQuery(BASE_URL, tokenCache.token);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch("REGISTER_START");
    try {
      const {
        membership_duration_specific,
        membership_duration_preset
      } = formState;
      //at least one must be set when registering a user
      if (!membership_duration_specific && !membership_duration_preset) {
        throw "You must set the membership duration of the user";
      }
      //fire a query to create a member. the query function expects a string
      //we get the mutation string through getter getCreateMemberMutation()
      //the getter expects an object with the member details
      const resData = await createMember(getCreateMemberMutation(formState));
      //graphql always resolves with status 200, so we add extra step to check if it returned errors
      if (resData.errors) {
        throw resData.errors;
      }
      //trigger ui updates
      dispatch("REGISTER_SUCCESS");
    } catch (err) {
      dispatch("REGISTER_FAIL", {
        output:
          typeof err === "string" // useful when we throw error strings like the one above
            ? err
            : "Registration failed! Something went wrong with our servers",
        errorDev: err
      });
    }
  };

  return (
    <Layout>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto"
        }}
      >
        <h2 className="RegForm__title">
          Please Enter Information <span role="img">📋</span>:
        </h2>
        <Form
          handleSubmit={submitHandler}
          loading={globalState.registering}
          error={globalState.errorRegister.output}
          success={globalState.registeredNewUser}
        >
          {inputs.map(input => {
            return (
              <Input
                state={formState}
                handler={(inputKey, inputValue) =>
                  setFormState(inputKey, inputValue, input.hasToRemove)
                }
                key={input.key}
                inputKey={input.key}
                label={input.label}
                elType={input.elType}
                initialValue={input.initialValue}
                elementConfig={input.elementConfig}
                description={input.description || ""}
                customProps={input.customProps || ""}
                iconConfig={input.iconConfig || ""}
              />
            );
          })}
        </Form>
      </div>
    </Layout>
  );
};

export default Register;
