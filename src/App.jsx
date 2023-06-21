import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

import { Link, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Plant from "./Pages/Plant";
import { useGlobalContext } from "./AppContext/AppContext";

function App() {
  // const [count, setCount] = useState(0);

  const { getCartItemNumber } = useGlobalContext();

  return (
    <>
      <Link to="/product">Product</Link>
      <Link to="/cart">
        Cart<sup>{`${getCartItemNumber() ? getCartItemNumber() : ""}`}</sup>
      </Link>
      <Routes>
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
