import React from "react";
import PropTypes from "prop-types";
import "./toggle.scss";

const Toggle = props => {
  /**
   * Toggle input change handler
   * @param {String} inputKey
   * @param {Event} event The Event object
   * @param {Function} handler Handler function returned by a custom hook from props.registerState
   */
  const toggleHandler = (inputKey, event, handler) => {
    //if toggle is about to be checked
    if (event.target.checked) {
      handler(inputKey, event.target.value);
    } else {
      handler(inputKey, false);
    }
  };

  return (
    <div className="Toggle">
      <input
        className="Toggle__input"
        type="checkbox"
        value={1}
        checked={props.state[props.inputKey]}
        onChange={event => toggleHandler(props.inputKey, event, props.handler)}
        onFocus={props.focusHandler}
        onBlur={props.focusHandler}
      />
    </div>
  );
};

Toggle.propTypes = {
  inputKey: PropTypes.string.isRequired,
  focusHandler: PropTypes.func
};

export default Toggle;
