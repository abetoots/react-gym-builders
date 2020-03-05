import React from "react";
import PropTypes from "prop-types";
// import "./datepicker.scss";

import ReactDatePicker from "react-date-picker";

const DatePicker = props => {
  const datepickerHandler = (inputKey, date, handler) => {
    handler(inputKey, date);
  };

  return (
    <ReactDatePicker
      className="DatePicker"
      value={props.state[props.inputKey]}
      onChange={date => datepickerHandler(props.inputKey, date, props.handler)}
      {...props.elementConfig}
    />
  );
};

DatePicker.propTypes = {
  elementConfig: PropTypes.shape({
    options: PropTypes.object
  })
};

export default DatePicker;
