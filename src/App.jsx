import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "./AppContext/AppContext";
import Product from "./Pages//Product/Product";
import Cart from "./Pages/Cart";
import Plant from "./Pages/Plant";
import Login from "./Pages/Login/Login";
import Navbar from "./components/Navbar";
import Checkout from "./Pages/Checkout";

function App() {
  const { setCheckout } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname);

  useEffect(() => {
    if (
      (location.state?.prevLocation == "/cart" && location.pathname !== "/checkout") ||
      location.state?.prevLocation == "/checkout"
    ) {
      setTimeout(() => {
        navigate(location.pathname, { state: null });
      }, 0);
      setCheckout([]);
      // console.log("clear");
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/product"
          element={<Product />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/product/:id"
          element={<Plant />}
        />
      </Routes>
    </>
  );
}

export default App;
