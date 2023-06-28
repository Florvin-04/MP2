import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlantCard from "../../components/PlantCard/PlantCard";
import { useGlobalContext } from "../../AppContext/AppContext";
import productCSS from "./Product.module.css";
import Loading from "../../components/Loading/Loading";

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

  // useEffect(() => {
  //   window.location.reload();
  // }, [location.pathname]);

  return (
    <>
      <div className={"container"}>
        <h1>Products</h1>
        {/* <button onClick={nav}>asd</button> */}

        <div className={productCSS["filter__plant"]}>
          <div className={productCSS["filterByName"]}>
            <input
              className={[productCSS["filterName"]]}
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
                {filterName} Plants
              </div>
              <ul
                className={`${productCSS["category__list"]} ${
                  toggleFilter && productCSS["active"]
                }`}
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
      </div>

      {loading ? (
        <div className="container">
          <Loading />
        </div>
      ) : (
        <div className={`container ${productCSS["plants__container"]}`}>
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
