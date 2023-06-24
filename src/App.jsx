import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

import { Route, Routes } from "react-router-dom";
import Product from "./Pages//Product/Product";
import Cart from "./Pages/Cart";
import Plant from "./Pages/Plant";
import Login from "./Pages/Login/Login";
import Navbar from "./components/Navbar";
import Checkout from "./Pages/Checkout";

function App() {
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
