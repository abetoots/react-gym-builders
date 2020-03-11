import React from "react";
import PropTypes from "prop-types";
import "./select.scss";

const Select = props => {
  return (
    <select
      className="Select"
      value={props.state[props.inputKey] || props.initialValue}
      onChange={event => props.handler(props.inputKey, event.target.value)}
      onFocus={props.focusHandler}
      onBlur={props.focusHandler}
      aria-labelledby={props.label.toLowerCase().replace(" ", "-")}
    >
      {props.elementConfig.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  initialValue: PropTypes.string.isRequired,
  inputKey: PropTypes.string.isRequired,
  elementConfig: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
      })
    ).isRequired
  }),
  focusHandler: PropTypes.func.isRequired,
  handler: PropTypes.func,
  state: PropTypes.object,
  label: PropTypes.string
};

export default Select;
