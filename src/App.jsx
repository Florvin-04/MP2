import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'

import { Link, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Link to="/product">Product</Link>
        <Link to="/cart">Cart</Link>
      <Routes>

        <Route
          path="/product"
          element={<Product />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
      </Routes>
    </>
  );
}

export default App;
