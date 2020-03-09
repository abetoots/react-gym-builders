import React from "react";
import PropTypes from "prop-types";
import "./BurgerMenu.scss";

const BurgerMenu = props => {
  const burgerClasses = ["BurgerMenu"];

  if (props.toggled) {
    burgerClasses.push("-toggled");
  }

  return (
    <button
      className={burgerClasses.join(" ")}
      aria-expanded={props.toggled}
      onClick={props.handleClick}
    >
      <div className="BurgerMenu__bar -one"></div>
      <div className="BurgerMenu__bar -two"></div>
      <div className="BurgerMenu__bar -three"></div>
      <span className={`BurgerMenu__label ${props.hideLabel ? "-hidden" : ""}`}>
        Menu
      </span>
    </button>
  );
};

BurgerMenu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  toggled: PropTypes.bool
};

export default BurgerMenu;
