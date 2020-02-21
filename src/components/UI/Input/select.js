import React from "react";
import PropTypes from "prop-types";
import "./select.scss";

const Select = props => {
  return (
    <select
      className="Select"
      value={props.state[props.inputKey]}
      onChange={event => handler(props.inputKey, event.target.value)}
      onFocus={props.focusHandler}
      onBlur={props.focusHandler}
    >
      {props.elementConfig.options.map(option => (
        <option inputKey={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  initialValue: PropTypes.string.isRequired,
  inputKey: PropTypes.string.isRequired,
  elementConfig: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string)
  }),
  focusHandler: PropTypes.func.isRequired
};

export default Select;
