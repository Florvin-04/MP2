import React from "react";
import "./Home.css";
import { useGlobalContext } from "../../AppContext/AppContext";
import PlantCard from "../../components/PlantCard/PlantCard";

function Home() {
  const { plants } = useGlobalContext();

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-lg-12"
            id="logo1"
          >
            <img
              src="image/Tanim-logo.png"
              alt="Logo"
            />
          </div>
          <div className="col-lg-12 d-none d-md-block">
            <div className="typewriter text-center">
              <h1>Rooted in nature, Delivered to your doorstep!</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="featured_plant">
          <h1 className="featured_plants-title">Featured Plants </h1>
          <div className="row">
            {/* <!-- Card 1 --> */}
            {plants.map((plant) => {
              if (plant.rarity.toLowerCase() == "rare") {
                return (
                  <PlantCard
                    {...plant}
                    key={plant.id}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
