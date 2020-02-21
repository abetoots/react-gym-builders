import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const BoundaryRedirect = props => {
  if (props.if) {
    if (props.ifTrueTo) {
      return <Redirect to={`${props.ifTrueTo}`} />;
    }
  } else {
    if (props.ifFalseTo) {
      return <Redirect to={`${props.ifFalseTo}`} />;
    }
  }

  return <>{props.children}</>;
};

BoundaryRedirect.propTypes = {
  if: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ifTrueTo: PropTypes.string,
  ifFalseTo: PropTypes.string
};

export default BoundaryRedirect;
