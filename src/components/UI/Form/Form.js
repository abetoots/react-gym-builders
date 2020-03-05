import React from "react";
import PropTypes from "prop-types";
import "./Form.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = props => {
  let statusUi;
  if (props.success) {
    statusUi = (
      <div className="Form__status -success">
        Success{" "}
        <span role="img" alt="success">
          ✅
        </span>{" "}
      </div>
    );
  }
  if (props.error) {
    statusUi = (
      <div className="Form__status -error">
        {props.error}{" "}
        <span role="img" alt="error">
          ❌
        </span>
      </div>
    );
  }
  return (
    <form
      className="Form"
      onSubmit={props.handleSubmit}
      style={{ ...props.formStyles }}
    >
      {
        // eslint-disable-next-line react/prop-types
        props.children
      }
      <button
        className="Form__submitBtn"
        disabled={props.loading}
        type="submit"
      >
        {props.loading ? (
          <FontAwesomeIcon icon="spinner" spin />
        ) : (
          props.btnText || "Submit"
        )}
      </button>
      {statusUi}
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.bool,
  btnText: PropTypes.string
};

export default Form;
