import React from "react";
import "./Footer.scss";

const Footer = props => (
  <footer className="Footer">
    <div>
      {new Date().getFullYear()} Builders | All rights reserved. Copyright
      &copy;.
      <span role="img">❤️</span>
    </div>
    <div>
      <span role="img" alt="built by">
        🛠️
      </span>
      Built by:Abe Suni M. Caymo
      <a
        className="Footer__projectLink"
        href="https://github.com/abetoots"
        target="_blank"
        rel="noreferrer noopener"
      >
        <i className="fas fa-globe"></i>
      </a>
    </div>
  </footer>
);

export default Footer;
