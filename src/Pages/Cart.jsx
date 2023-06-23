import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../AppContext/AppContext";

function Cart() {
  const { plants, cart, addToCart, removeToCart, updateCartValue, getTotalAmount } =
    useGlobalContext();

  const navigate = useNavigate();

  // const [cartValue, setCartValue] = useState({
  //   cartInput: 0,
  //   id: null,
  // });

  // function handleChange(e) {
  //   const target = e.target;
  //   const { name, value, type } = target;

  //   setCartValue((prevData) => ({
  //     ...prevData,
  //     [name]: Number(value),
  //   }));
  // }

  // console.log(cartValue);

  return (
    <div>
      {plants.map((plant) => {
        if (cart[plant.id].itemCount !== 0) {
          return (
            <div key={plant.id}>
              <p>{plant.name}</p>
              <button onClick={(e) => addToCart(plant.id)}>+</button>
              <input
                type="text"
                name="cartInput"
                value={cart[plant.id].itemCount}
                // value={cartValue.cartInput || cart[plant.id].itemCount}
                onChange={(e) => updateCartValue(Number(e.target.value), plant.id)}
              />
              <button onClick={() => removeToCart(plant.id)}>-</button>
              <span>SubTotal {cart[plant.id].itemCount * plant.price}</span>
            </div>
          );
        }
      })}

      {getTotalAmount() ? (
        <div>
          <p>Total Amount {getTotalAmount()}</p>
          <button
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <p>No Item</p>
      )}
    </div>
  );
}

export default Cart;

// updateCartValue(Number(e.target.value), plant.id)
