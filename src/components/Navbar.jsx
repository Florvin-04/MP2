import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../AppContext/AppContext";

function Navbar() {
  const { getCartItemNumber } = useGlobalContext();
  const location = useLocation();
 

  if (location.pathname == "/login") {
    return;
  }

  return (
    <>
      <Link to="/product">Product</Link>
      <Link to="/cart">
        Cart<sup>{`${getCartItemNumber() ? getCartItemNumber() : ""}`}</sup>
      </Link>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Navbar;
