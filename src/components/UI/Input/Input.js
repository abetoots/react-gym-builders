import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Input.scss";

import Checkbox from "./checkbox";
import File from "./file";
import Select from "./select";
import Textarea from "./textarea";
import DatePicker from "./datepicker";
import Toggle from "./toggle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = props => {
  let inputElement;

  //Adds/removes a focused class
  const focusHandler = event => {
    if (event.type === "focus") {
      event.target.classList.add("-focused");
      event.target.parentElement.classList.add("-focused");
    } else {
      event.target.classList.remove("-focused");
      event.target.parentElement.classList.remove("-focused");
    }
  };

  //Handle which input element to return
  if (props.elType) {
    switch (props.elType) {
      case "input":
        switch (props.elementConfig.type) {
          case "file":
            inputElement = (
              <File
                state={props.state}
                initialValue={props.initialValue}
                handler={props.handler}
                inputKey={props.inputKey}
                elementConfig={props.elementConfig}
                customProps={props.customProps}
              />
            );
            break;
          default:
            inputElement = (
              <>
                <input
                  className="Input__inputEl"
                  {...props.elementConfig}
                  value={props.state[props.inputKey]}
                  onChange={event =>
                    props.handler(props.inputKey, event.target.value)
                  }
                  onFocus={focusHandler}
                  onBlur={focusHandler}
                />
                <div className="Input__line"></div>
              </>
            );
        }
        break; // end 'input' elType
      case "textarea":
        inputElement = (
          <Textarea
            state={props.state}
            initialValue={props.initialValue}
            handler={props.handler}
            inputKey={props.inputKey}
            elementConfig={props.elementConfig}
            focusHandler={focusHandler}
          />
        );
        break;
      case "select":
        inputElement = (
          <Select
            state={props.state}
            initialValue={props.initialValue}
            handler={props.handler}
            inputKey={props.inputKey}
            elementConfig={props.elementConfig}
            focusHandler={focusHandler}
          />
        );
        break;
      case "checkbox":
        inputElement = (
          <Checkbox
            state={props.state}
            handler={props.handler}
            inputKey={props.inputKey}
            elementConfig={props.elementConfig}
            focusHandler={focusHandler}
          />
        );
        break;

      case "toggle":
        inputElement = (
          <Toggle
            state={props.state}
            initialValue={props.initialValue}
            handler={props.handler}
            inputKey={props.inputKey}
            focusHandler={focusHandler}
          />
        );
        break;

      case "datepicker":
        inputElement = (
          <DatePicker
            state={props.state}
            initialValue={props.initialValue}
            handler={props.handler}
            elementConfig={props.elementConfig}
            inputKey={props.inputKey}
            focusHandler={focusHandler}
          />
        );
        break;

      case "editor":
        inputElement = props.children;
        break;

      default:
        inputElement = (
          <>
            <input
              className="Input__inputEl"
              {...props.elementConfig}
              value={props.state[props.inputKey]}
              onChange={event =>
                props.handler(props.inputKey, event.target.value)
              }
              onFocus={focusHandler}
              onBlur={focusHandler}
            />
            <div className="Input__line"></div>
          </>
        );
    }
  } // end switch case for normal inputs

  let iconLabel;
  let iconInput;
  if (props.iconConfig) {
    switch (props.iconConfig.position) {
      case "outside":
        iconLabel = (
          <FontAwesomeIcon
            className="Input__icon -outside"
            icon={props.iconConfig.icon}
          />
        );
        break;

      case "inside":
        iconInput = (
          <FontAwesomeIcon
            className="Input__icon -inside"
            icon={props.iconConfig.icon}
          />
        );
      default:
        return;
    }
  }

  return (
    <div className="Input">
      <label className="Input__label">
        {props.label}
        {iconLabel}
      </label>
      <span style={{ fontStyle: "italic" }}>{props.description}</span>
      <section
        className={`Input__slot -relative ${
          props.iconConfig.position === "inside" ? " -withIcon" : ""
        } `}
      >
        {inputElement}
        {iconInput}
      </section>
    </div>
  );
};

Input.propTypes = {
  elType: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  handler: PropTypes.func.isRequired
};

export default Input;
