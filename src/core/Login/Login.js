import React, { useState } from "react";

//Components
import Layout from "../../components/layout";
import Form from "../../components/UI/Form/Form";
import Input from "../../components/UI/Input/Input";
import BoundaryRedirect from "../../hoc/BoundaryRedirect/BoundaryRedirect";

//Fetch
import { useLazyLoginMutation } from "../../misc/hooks/auth";

import inputs, { useFormState } from "../../misc/forms/login";
import { useStore } from "../../misc/store/store-core";
import { getLoginMutation } from "../../misc/shared/constants";

const Login = props => {
  const [formState, setFormState] = useFormState();
  const [globalState, dispatch] = useStore("token");
  const [startLogin] = useLazyLoginMutation(dispatch);
  const [error, setError] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    const { login, password } = formState;

    if (!login && !password) {
      return setError("Login & Password not set");
    }
    startLogin(getLoginMutation(login, password));
  };

  return (
    <Layout
      mainStyle={{
        maxWidth: "500px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center"
      }}
    >
      <BoundaryRedirect
        if={globalState.calledAuth && globalState.authenticated}
        ifTrueTo="/dashboard"
      />
      <Form
        handleSubmit={submitHandler}
        loading={globalState.pendingAuth}
        error={error || globalState.errorAuth.output}
      >
        {inputs.map(input => {
          return (
            <Input
              state={formState}
              handler={(inputKey, inputValue) =>
                setFormState(inputKey, inputValue)
              }
              key={input.key}
              inputKey={input.key}
              label={input.label}
              elType={input.elType}
              initialValue={input.initialValue}
              elementConfig={input.elementConfig}
              customProps={input.customProps || ""}
              iconConfig={input.iconConfig || ""}
            />
          );
        })}
      </Form>
    </Layout>
  );
};

export default Login;
