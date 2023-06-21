import React from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../AppContext/AppContext";

function Plant() {
  const { plants } = useGlobalContext();
  const { id } = useParams();

  return (
    <div>
      <h1>plants</h1>
      {plants
        .filter((plant) => plant.id == id)
        .map((plant) => {
          return (
            <div key={plant.id}>
              <h2>{plant.name}</h2>
            </div>
          );
        })}
    </div>
  );
}

export default Plant;
