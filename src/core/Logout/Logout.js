import React, { useEffect } from "react";
import BoundaryRedirect from "../../hoc/BoundaryRedirect/BoundaryRedirect";
import { useStore } from "../../misc/store/store-core";

const Logout = props => {
  const [globalState, dispatch] = useStore();
  useEffect(() => {
    dispatch("LOGOUT");
  }, []);
  return <BoundaryRedirect if={!globalState.authenticated} ifTrueTo="/login" />;
};

export default Logout;
