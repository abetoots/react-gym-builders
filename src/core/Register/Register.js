import React from "react";

//Components
import Layout from "../../components/layout";
import Form from "../../components/UI/Form/Form";
import Input from "../../components/UI/Input/Input";

import { useStore } from "../../hooks/store/store";
import inputs, { useFormState } from "../../misc/forms/register";
import { tokenCache } from "../../hooks/wp-graphql-token";
import { useLazyFetchQuery } from "../../hooks/util";
import { getCreateMemberMutation, GYM_MEMBER } from "../../misc/constants";

const Register = props => {
  const [formState, setFormState] = useFormState();
  const [globalState, dispatch] = useStore("users");

  const [
    createMember,
    { loading: loadingCreate, success: successCreate, error: errorCreate }
  ] = useLazyFetchQuery(BASE_URL, tokenCache.token);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch("REGISTER_START");
    try {
      const resData = await createMember(
        getCreateMemberMutation(formState, GYM_MEMBER)
      );
      if (resData.errors) {
        throw resData.errors;
      }
      dispatch("REGISTER_SUCCESS");
    } catch (err) {
      dispatch("REGISTER_FAIL", {
        output: "Registration failed! Something went wrong with our servers",
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
          success={globalState.registered}
        >
          {inputs.map(input => {
            return (
              <Input
                state={formState}
                handler={(inputKey, inputValue) =>
                  setFormState(inputKey, inputValue, input.hasToRemove || null)
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
