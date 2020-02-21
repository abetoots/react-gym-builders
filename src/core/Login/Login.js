import React, { useState } from "react";
import PropTypes from "prop-types";

//Components
import Layout from "../../components/layout";
import Form from "../../components/UI/Form/Form";
import Input from "../../components/UI/Input/Input";
import BoundaryRedirect from "../../hoc/BoundaryRedirect/BoundaryRedirect";

//Fetch
import { useLazyLoginMutation } from "../../hooks/wp-graphql-token";

import inputs, { useFormState, getHandler } from "../../util/forms/login";
import { useStore } from "../../hooks/store/store";

const Login = props => {
  const [formState, formUpdate] = useFormState();
  const [state, dispatch] = useStore();
  const [startLogin, setQuery] = useLazyLoginMutation(dispatch);
  const [error, setError] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    const { login, password } = formState;

    if (!login && !password) {
      return setError("Login & Password not set");
    }
    setQuery(`
    mutation LoginUser{
      login(
        input: {
          clientMutationId: ""
          username: "${login}"
          password: "${password}"
        }
      ) {
        authToken
        refreshToken
        user {
          jwtAuthExpiration
        }
      }
    }
  `);
    startLogin();
  };

  return (
    <Layout
      mainStyle={{
        minWidth: "400px",
        maxWidth: "50%",
        margin: "0 auto",
        display: "flex",
        alignItems: "center"
      }}
    >
      <BoundaryRedirect
        if={state.calledLogin && state.loggedIn}
        ifTrueTo="/dashboard"
      />
      <Form
        handleSubmit={submitHandler}
        loading={state.loadingLogin}
        error={error || state.errorLogin}
      >
        {inputs.map(input => {
          return (
            <Input
              state={formState}
              handler={getHandler(formUpdate)}
              key={input.key}
              inputKey={input.key}
              label={input.label}
              htmlTag={input.htmlTag}
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
