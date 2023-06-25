import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../AppContext/AppContext";

function Navbar() {
  const { getCartItemNumber } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  if (location.pathname == "/login") {
    return;
  }

  return (
    <>
      <Link
        to="/product"
        state={{ prevLocation: location.pathname }}
      >
        Product
      </Link>

      <Link
        to="/cart"
        state={{ prevLocation: location.pathname }}
      >
        Cart<sup>{`${getCartItemNumber() ? getCartItemNumber() : ""}`}</sup>
      </Link>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Navbar;
