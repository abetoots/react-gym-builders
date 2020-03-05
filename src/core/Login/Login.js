import React, { useState } from "react";
import PropTypes from "prop-types";

//Components
import Layout from "../../components/layout";
import Form from "../../components/UI/Form/Form";
import Input from "../../components/UI/Input/Input";
import BoundaryRedirect from "../../hoc/BoundaryRedirect/BoundaryRedirect";

//Fetch
import { useLazyLoginMutation } from "../../hooks/auth";

import inputs, { useFormState } from "../../misc/forms/login";
import { useStore } from "../../store/store";
import { getLoginMutation } from "../../misc/constants";

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
        if={globalState.calledLogin && globalState.loggedIn}
        ifTrueTo="/dashboard"
      />
      <Form
        handleSubmit={submitHandler}
        loading={globalState.loadingLogin}
        error={error || globalState.errorLogin.output}
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
