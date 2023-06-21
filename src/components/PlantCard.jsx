import React from "react";

import { useGlobalContext } from "../AppContext/AppContext";

function PlantCard(plant) {
  const { cart, addToCart } = useGlobalContext();

  return (
    <>
      <div className="card_product">
        <div className="card_img">
          <img
            src="#"
            alt="#"
          />
        </div>
        <div className="card_info">{plant.name}</div>
        <p>{cart[plant.id].availability}</p>
        <button
          className=""
          onClick={() => addToCart(plant.id)}
        >
          add to cart {cart[plant.id].itemCount !== 0 && `(${cart[plant.id].itemCount})`}
        </button>
      </div>
    </>
  );
}

export default PlantCard;
