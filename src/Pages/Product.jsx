import React from "react";

import PlantCard from "../components/PlantCard";
import { useGlobalContext } from "../AppContext/AppContext";

function Product() {
  const { plants } = useGlobalContext();
  return (
    <>
      <h1>Products</h1>
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
