import React from "react";
import PropTypes from "prop-types";
import "./textarea.scss";

const TextArea = props => {
  return (
    <textarea
      className="Textarea"
      {...props.elementConfig}
      value={props.state[props.inputKey]}
      onChange={event => handler(props.inputKey, event.target.value)}
      onFocus={props.focusHandler}
      onBlur={props.focusHandler}
    />
  );
};

TextArea.propTypes = {
  initialValue: PropTypes.string.isRequired,
  inputKey: PropTypes.string.isRequired
};

export default TextArea;
