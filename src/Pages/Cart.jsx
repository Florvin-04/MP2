import React from "react";
import { useGlobalContext } from "../AppContext/AppContext";

function Cart() {
  const { plants, cart, addToCart, removeToCart, updateCartValue } = useGlobalContext();

  return (
    <div>
      {plants.map((plant) => {
        if (cart[plant.id].itemCount !== 0) {
          return (
            <div key={plant.id}>
              <p>{plant.name}</p>
              <button onClick={() => addToCart(plant.id)}>+</button>
              <input
                type="text"
                value={cart[plant.id].itemCount}
                onChange={(e) => updateCartValue(Number(e.target.value), plant.id)}
              />
              <button onClick={() => removeToCart(plant.id)}>-</button>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Cart;
