import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlantCard from "../../components/PlantCard";
import { useGlobalContext } from "../../AppContext/AppContext";
import productCSS from "./Product.module.css";

function Product() {
  const {
    plants,
    filterByName,
    setFilterByName,
    categories,
    setFilterByCategory,
    loading,
    setLoading,
  } = useGlobalContext();

  const [toggleFilter, setToggleFilter] = useState(false);
  const [filterName, setFilterName] = useState("All");

  const navigate = useNavigate();
  const location = useLocation();

  function nav() {
    navigate("/product", {
      state: {
        prevUrl: location.pathname,
      },
    });
  }

  return (
    <>
      <h1>Products</h1>
      <button onClick={nav}>asd</button>
      <br />
      <input
        type="text"
        placeholder="search"
        name="plant"
        value={filterByName}
        onChange={(e) => setFilterByName(e.target.value)}
      />

      {/* <select
        name="category"
        id="category"
       
      >
        {categories.map((category) => {
          return <option value={category}>{category}</option>;
        })}
      </select> */}

      <div>
        <label
          htmlFor="region"
          className={productCSS["dropdown__region"]}
        >
          <div
            className={productCSS["filter__region"]}
            onClick={() => setToggleFilter((prev) => !prev)}
          >
            {/* {region} */}
            {filterName}
          </div>
          <ul className={`${productCSS["region__list"]} ${toggleFilter && productCSS["active"]}`}>
            {categories.map((plant, idx) => {
              return (
                <li
                  className={productCSS["region__list--item"]}
                  key={idx}
                  onClick={() => {
                    setFilterName(plant);
                    setFilterByCategory(plant);
                    setToggleFilter(false);
                  }}
                >
                  {plant}
                </li>
              );
            })}
          </ul>
        </label>
      </div>

      {plants.length === 0 && loading == false && <h2>No Plant Found</h2>}

      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        plants.map((plant) => {
          return (
            <PlantCard
              {...plant}
              key={plant.id}
            />
          );
        })
      )}
    </>
  );
}

export default Product;
