import React from "react";
import "./PlantCard.css";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../AppContext/AppContext";

function PlantCard(plant) {
  const { cart, addToCart } = useGlobalContext();

  return (
    <div className="card">
      <Link to={`/product/${plant.id}`}>
        <div className="card_product">
          <div className="card_img">
            <img
              src="#"
              alt="#"
            />
          </div>
          <div className="card_info">{plant.name}</div>
          <p>{cart[plant.id].availability}</p>
        </div>
      </Link>
      <button
        className=""
        onClick={(e) => addToCart(plant.id)}
      >
        add to cart {cart[plant.id].itemCount !== 0 && `(${cart[plant.id].itemCount})`}
      </button>
    </div>
  );
}

export default PlantCard;
