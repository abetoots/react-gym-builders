import React from "react";
import PropTypes from "prop-types";
import "./textarea.scss";

const TextArea = props => {
  return (
    <textarea
      className="Textarea"
      {...props.elementConfig}
      value={props.state[props.inputKey]}
      onChange={event => props.handler(props.inputKey, event.target.value)}
      onFocus={props.focusHandler}
      onBlur={props.focusHandler}
      aria-labelledby={props.label.toLowerCase().replace(" ", "-")}
    />
  );
};

TextArea.propTypes = {
  initialValue: PropTypes.string.isRequired,
  inputKey: PropTypes.string.isRequired,
  elementConfig: PropTypes.object,
  state: PropTypes.object,
  focusHandler: PropTypes.func,
  label: PropTypes.string,
  handler: PropTypes.func
};

export default TextArea;
