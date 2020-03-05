import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Spinner2 from "./UI/Spinner/Spinner2";

const Layout = props => {
  const { children } = props;

  if (props.loading) {
    return props.loadingComponent ? (
      props.loadingComponent
    ) : (
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center"
        }}
      >
        <Spinner2 />
      </div>
    );
  }

  if (props.error) {
    return <div>{`${props.error}`}</div>;
  }

  return (
    <>
      <Header />
      <main
        style={{
          minHeight: `calc(100vh - 143px)`,
          ...props.mainStyle
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.propType = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  loadingComponent: PropTypes.elementType
};

export default Layout;
