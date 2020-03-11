import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./file.scss";

const File = props => {
  const fileInputEl = useRef(null);
  /**
   * File button handler
   * Problem: We can't style <input type="file"/> buttons through css
   * Solution: We delegate it to a different button we can style which simply triggers a click on <input type="file"/>
   */
  const fileBtnHandler = event => {
    fileInputEl.current.click();
  };

  const fileHandler = (inputKey, event, handler) => {
    //Return when user doesn't select anything
    if (event.target.files.length == 0) {
      return;
    }

    //We check if preview was previously set
    if (props.state[inputKey].preview) {
      //We always want to revoke previosu object url
      //Avoid memory issues by revoking the previous objecUrl created
      //TODO link as to why
      URL.revokeObjectURL(props.state[inputKey].preview);
    }

    //we make a copy (avoid referencing original object)
    //then we'll merge the new values
    const file = event.target.files[0];
    const copy = {
      ...props.state[inputKey],
      file: file,
      preview: URL.createObjectURL(file)
    };

    //handler will now set the new object as the new value of this inputKey's state
    handler(inputKey, copy);
  };

  return (
    <div className="File">
      <button className="File__btn" type="button" onClick={fileBtnHandler}>
        {props.customProps.btnText}
      </button>
      <div className="File__preview">
        <img
          className="File__img"
          src={
            props.state[props.inputKey].url ||
            props.state[props.inputKey].preview ||
            ""
          }
        />
      </div>
      <input
        className="File__input"
        {...props.elementConfig}
        onChange={event => fileHandler(props.inputKey, event, props.handler)}
        ref={fileInputEl}
        aria-labelledby={props.label.toLowerCase().replace(" ", "-")}
      />
    </div>
  );
};

File.propTypes = {
  initialValue: PropTypes.shape({
    file: PropTypes.object,
    preview: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  inputKey: PropTypes.string.isRequired,
  elementConfig: PropTypes.shape({
    type: PropTypes.string.isRequired,
    accept: PropTypes.string
  }),
  customProps: PropTypes.shape({
    btnText: PropTypes.string
  }),
  label: PropTypes.string,
  state: PropTypes.object,
  handler: PropTypes.func
};

export default File;
