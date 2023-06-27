import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../AppContext/AppContext";
import logo from '/image/Tanim-logo.png'
import "./Navbar.css";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div
          className="container"
          id="nav"
        >
          <a
            className="navbar-brand"
            href="#"
            id="logo_pic"
          >
            <img
              src={logo}
              alt="Logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="home-button">
                <a
                  className="nav-link"
                  href="#"
                >
                  <strong>Home</strong>
                </a>
              </li>

              <li className="about-us">
                <a
                  className="nav-link"
                  href="#"
                >
                  <strong>About Us</strong>
                </a>
              </li>

              <li className="product">
                {/* <a
                  className="nav-link"
                  href="#"
                >
                  <strong>Products</strong>
                </a> */}

                <Link
                  to="/product"
                  state={{ prevLocation: location.pathname }}
                  className="nav-link"
                >
                  <strong>Products</strong>
                </Link>
              </li>

              <li className="cart-nav">
                <Link
                  className="nav-link"
                  to="/cart"
                  state={{ prevLocation: location.pathname }}
                >
                  <svg
                    className="cart"
                    width="22"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                      fill="#69707D"
                      fillRule="nonzero"
                    />
                  </svg>
                  {/* <sup>{`${getCartItemNumber() ? getCartItemNumber() : ""}`}</sup> */}
                  {getCartItemNumber() ? <p>{getCartItemNumber()}</p> : ""}
                </Link>
              </li>

              {/* <svg
                cart-svg
                class="cart"
                width="22"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="#69707D"
                  fill-rule="nonzero"
                />
              </svg> */}

              <li className="login-button">
                <Link
                  to="/login"
                  className="nav-link"
                >
                  <strong>Log In</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <Link
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
      <Link to="/login">Login</Link> */}
    </>
  );
}

export default Navbar;
