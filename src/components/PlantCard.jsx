import React from "react";
import "./PlantCard.css";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../AppContext/AppContext";

function PlantCard(plant) {
  const { cart, addToCart } = useGlobalContext();
  console.log(plant.img);

  return (
    // <div className="card">
    //   <Link to={`/product/${plant.id}`}>
    //     <div className="card_product">
    //       <div className="card_img">
    //         <img
    //           src="#"
    //           alt="#"
    //         />
    //       </div>
    //       <div className="card_info">{plant.name} {plant.family}</div>
    //       <p>{cart[plant.id].availability}</p>
    //     </div>
    //   </Link>
    //   <button
    //     className=""
    //     onClick={(e) => addToCart(plant.id)}
    //   >
    //     add to cart {cart[plant.id].itemCount !== 0 && `(${cart[plant.id].itemCount})`}
    //   </button>

    // </div>
    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
      <div className="card">
        <img
          src={plant.img}
          className="card-img-top"
          alt={plant.name}
        />
        <div className="card-body">
          <h5 className="card-title">{plant.name}</h5>
          {/* <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          <Link
            type="button"
            className="btn btn-primary"
            // data-bs-toggle="modal"
            // data-bs-target="#product1"
            to={`/product/${plant.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlantCard;
