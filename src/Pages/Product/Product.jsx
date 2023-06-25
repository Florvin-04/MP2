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

  // function nav() {
  //   navigate("/product", {
  //     state: {
  //       prevUrl: location.pathname,
  //     },
  //   });
  // }

  return (
    <>
      <h1>Products</h1>
      {/* <button onClick={nav}>asd</button> */}

      <div className={productCSS["filter__plant"]}>
        <div className={productCSS["filterByName"]}>
          <input
            type="text"
            placeholder="search"
            name="plant"
            value={filterByName}
            onChange={(e) => setFilterByName(e.target.value)}
          />
        </div>
        <div className={productCSS["filterByFamily"]}>
          <label
            htmlFor="region"
            className={productCSS["dropdown__category"]}
          >
            <div
              className={productCSS["filter__category"]}
              onClick={() => setToggleFilter((prev) => !prev)}
            >
              {/* {category} */}
              {filterName}
            </div>
            <ul
              className={`${productCSS["category__list"]} ${toggleFilter && productCSS["active"]}`}
            >
              {categories.map((plant, idx) => {
                return (
                  <li
                    className={productCSS["category__list--item"]}
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
      </div>

      {plants.length === 0 && loading == false && <h2>No Plant Found</h2>}

      {loading ? (
        <h1>LOADING...</h1>
      ) : (
        <div className="container">
          <div className="row">
            {plants.map((plant) => {
              return (
                <PlantCard
                  {...plant}
                  key={plant.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
