import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BoundaryRedirect from "../../hoc/BoundaryRedirect/BoundaryRedirect";
import { useStore } from "../../misc/store/store-core";

const Logout = props => {
  const [state, dispatch] = useStore();
  useEffect(() => {
    dispatch("LOGOUT");
  }, []);
  return <BoundaryRedirect if={!state.authenticated} ifTrueTo="/login" />;
};

export default Logout;
