import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import { useGlobalContext } from "../AppContext/AppContext";

function Product() {
  const { plants } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  function nav() {
    navigate("/login", {
      state: {
        prevUrl: location.pathname,
      },
    });
  }
  return (
    <>
      <h1>Products</h1>
      <button onClick={nav}>asd</button>
      {plants.map((plant) => {
        return (
          <PlantCard
            {...plant}
            key={plant.id}
          />
        );
      })}
    </>
  );
}

export default Product;
