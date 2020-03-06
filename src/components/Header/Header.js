import React, { useState, useRef } from "react";
import "./Header.scss";

import { getLinkList } from "../../misc/link-list";

import Logo from "../UI/Logo/Logo";
import BurgerMenu from "../UI/BurgerMenu/BurgerMenu";
import Menu from "../UI/Menu/Menu";

import logo from "../../assets/builders-gym.svg";

const Header = props => {
  const [menuToggled, setMenuToggled] = useState(false);

  const targetElToDisplay = useRef(null);
  const target = useRef(null);

  const menuClickHandler = e => {
    if (targetElToDisplay === null) {
      console.log("target not found");
      return;
    }
    let wrapperHeight = target.current.getBoundingClientRect().height;
    let targetheight = targetElToDisplay.current.clientHeight;
    if (targetheight > 0) {
      targetElToDisplay.current.style.height = 0;
      targetElToDisplay.current.style.visibility = "hidden";
    } else {
      targetElToDisplay.current.style.height = `${wrapperHeight}px`;
      targetElToDisplay.current.style.visibility = "initial";
    }

    setMenuToggled(prev => !prev);
  };
  return (
    <section className="HeaderWrap">
      <header className="Header">
        <div className="Header__slot -horizontal">
          <Logo src={logo} alt={"Builders Logo"} />
          <BurgerMenu handleClick={menuClickHandler} toggled={menuToggled} />
        </div>
      </header>
      <div ref={targetElToDisplay} className="HeaderWrap__slot -menu">
        <div ref={target}>
          <Menu
            linklist={getLinkList()}
            toggled={menuToggled}
            touchTargetStyles={{
              borderBottom: "1px solid #ccc"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
