import React from "react";
import PropTypes from "prop-types";

const Checkbox = props => {
  /**
   * Checkbox input change handler
   * Handles checkbox cases where we expect the checkbox's state to be an array of currently checked values
   * @param {String} inputKey
   * @param {Event} event The Event object
   * @param {Function} handler Handler function returned by a custom hook from props.registerState
   */
  const checkboxHandler = (inputKey, event, handler) => {
    //we make a copy (avoid referencing original array)
    //that we'll set as the new value at the end of this function
    const copy = [...props.state[inputKey]];
    //if checkbox is about to be checked
    if (event.target.checked) {
      //push the value to the copied array
      copy.push(event.target.value);
    } else {
      //if checkbox is about to be unchecked
      // we also want to remove that value from the copied array
      copy = copy.filter(val => val !== event.target.value);
    }

    //handler will now set the new array as the new value of this inputKey's state
    handler(inputKey, copy);
  };

  return (
    <ul
      className="Checkbox"
      aria-labelledby={props.label.toLowerCase().replace(" ", "-")}
    >
      {props.elementConfig.options.map(option => {
        return (
          <li key={option} className="Checkbox__li">
            <input
              id={option}
              className="Checkbox__input"
              type="checkbox"
              value={option}
              checked={
                props.state[props.inputKey].includes(option) ||
                option === props.initialValue
              }
              onChange={event =>
                checkboxHandler(props.inputKey, event, props.handler)
              }
              onFocus={props.focusHandler}
              onBlur={props.focusHandler}
            />
            <label htmlFor={option}>{option}</label>
          </li>
        );
      })}
    </ul>
  );
};

Checkbox.propTypes = {
  initialValue: PropTypes.string,
  inputKey: PropTypes.string.isRequired,
  focusHandler: PropTypes.func,
  elementConfig: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  label: PropTypes.string
};

export default Checkbox;
