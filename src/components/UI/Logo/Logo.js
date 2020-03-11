import React from "react";
import PropTypes from "prop-types";
import "./Logo.scss";

const Logo = props => (
  <div className="Logo">
    <img
      className="Logo__img"
      src={props.src}
      alt={props.alt ? `${props.alt}` : "Site Logo"}
    />
  </div>
);

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

export default Logo;
