import React from "react";
import PropTypes from "prop-types";

import Spinner2 from "../../components/UI/Spinner/Spinner2";

const Boundary = props => {
  if (props.loading) {
    return props.loadingComponent ? (
      props.loadingComponent
    ) : (
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center"
        }}
      >
        <Spinner2 />;
      </div>
    );
  }

  //Errors meant to be shown to the user
  if (props.errorShow) {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center"
        }}
      >{`${props.errorShow}`}</div>
    );
  }

  if (props.errorGeneric) {
    return (
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center"
        }}
      >
        <span role="img" alt="something went wrong">
          🤷
        </span>
        Something went wrong. Try contacting your developer
      </div>
    );
  }

  return props.children;
};

Boundary.propTypes = {
  loading: PropTypes.bool,
  errorShow: PropTypes.string,
  errorGeneric: PropTypes.bool
};

export default Boundary;
