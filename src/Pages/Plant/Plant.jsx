import { useState } from "react";
import "./Plant.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../AppContext/AppContext";
import { PiArrowFatLeftFill } from "react-icons/pi";
const INITIAL_VALUE = {
  plantCount: 0,
  plantId: null,
};
function Plant() {
  const { plants, cart, addToCart, buyNow, setCart } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuanity] = useState(INITIAL_VALUE);
  const [buttonClicked, setButtonClicked] = useState(INITIAL_VALUE);

  function addPlant(e, id) {
    const target = e.target;
    const { value } = target;

    // const foundPlant = plants.find((plant) => plant.id == id);
    if (cart[id].availability < value) {
      return;
    }
    setQuanity((prevData) => ({
      ...prevData,
      plantCount: Number(value),
      plantId: Number(id),
    }));
  }

  function submitChanges(e) {
    e.preventDefault();

    setCart((prevData) => ({
      ...prevData,
      [quantity.plantId]: {
        ...prevData[quantity.plantId],
        itemCount: Number([quantity.plantCount]),
      },
    }));
  }

  console.log(quantity);

  return (
    <div>
      <div className="container">
        <button
          style={{ backgroundColor: "transparent" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <PiArrowFatLeftFill style={{ fontSize: "30px", fill: "#06c179" }} />
        </button>
      </div>
      {plants
        .filter((plant) => plant.id == id)
        .map((plant) => {
          return (
            <div key={plant.id}>
              {/* <div>
                <h2>{plant.name}</h2>
                <button
                  className=""
                  onClick={() => addToCart(plant.id)}
                >
                  add to cart {cart[plant.id].itemCount !== 0 && `(${cart[plant.id].itemCount})`}
                </button>

                <button
                  onClick={() => {
                    navigate("/checkout");
                    buyNow(plant.id);
                  }}
                >
                  buy now
                </button>
                <form
                  action=""
                  onSubmit={submitChanges}
                >
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    placeholder="Enter"
                    value={quantity.plantCount}
                    onChange={(e) => addPlant(e, plant.id)}
                  />
                </form>
              </div> */}

              <section className="product__information--container">
                <div className="product__container">
                  <img
                    className="product__img"
                    src={plant.img}
                    alt={plant.name}
                  />
                  {/* <img
                    carousel-child="2"
                    className="product__img"
                    src="./images/image-product-2.jpg"
                    alt=""
                  />
                  <img
                    carousel-child="3"
                    className="product__img"
                    src="./images/image-product-3.jpg"
                    alt=""
                  />
                  <img
                    carousel-child="4"
                    className="product__img"
                    src="./images/image-product-4.jpg"
                    alt=""
                  /> */}

                  {/* <button
                    className="prev__btn"
                    data-caorusel-button="prev"
                  >
                    <svg
                      width="12"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 1 3 9l8 8"
                        stroke="#1D2026"
                        stroke-width="3"
                        fill="none"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="next__btn"
                    data-caorusel-button="next"
                  >
                    <svg
                      width="13"
                      height="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m2 1 8 8-8 8"
                        stroke="#1D2026"
                        stroke-width="3"
                        fill="none"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button> */}

                  {/* <div
                    className="product__tumbnail-container"
                    tumbnail-carousel-container
                  >
                    <div
                      data-active
                      carousel-thumbnail="1"
                      className="product__tumbnail--item active"
                    >
                      <img
                        className="product__tumbnail"
                        src="./images/image-product-1-thumbnail.jpg"
                        alt=""
                      />
                    </div>
                    <div
                      carousel-thumbnail="2"
                      className="product__tumbnail--item"
                    >
                      <img
                        className="product__tumbnail"
                        src="./images/image-product-2-thumbnail.jpg"
                        alt=""
                      />
                    </div>
                    <div
                      carousel-thumbnail="3"
                      className="product__tumbnail--item"
                    >
                      <img
                        className="product__tumbnail"
                        src="./images/image-product-3-thumbnail.jpg"
                        alt=""
                      />
                    </div>
                    <div
                      carousel-thumbnail="4"
                      className="product__tumbnail--item"
                    >
                      <img
                        className="product__tumbnail"
                        src="./images/image-product-4-thumbnail.jpg"
                        alt=""
                      />
                    </div>
                  </div> */}
                </div>
                <div className="product__information">
                  <p className="company-name">Plant</p>
                  <h1 className="product__name">{plant.name}</h1>
                  <p className="product__description">{plant.description}</p>
                  <div className="product__price--container">
                    <p className="discounted__price">
                      PHP{plant.price}
                      {/* <span className="percentage-off">50%</span> */}
                    </p>
                    <p className="actual__price">$250.00</p>
                  </div>

                  <div className="add-to-cart--container">
                    <div className="number-of-item--container">
                      <button
                        form="override-cart-value_form"
                        className="subtract-item"
                        onClick={(e) => {
                          setQuanity((prevData) => ({
                            plantCount: prevData.plantCount <= 0 ? 0 : prevData.plantCount - 1,
                            plantId: plant.id,
                          }));
                        }}
                      >
                        <svg
                          width="12"
                          height="4"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <defs>
                            <path
                              d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                              id="a"
                            />
                          </defs>
                          <use
                            fill="#06c179"
                            fillRule="nonzero"
                            xlinkHref="#a"
                          />
                        </svg>
                      </button>

                      <form
                        action=""
                        onSubmit={submitChanges}
                        id="override-cart-value_form"
                      >
                        <input
                          type="text"
                          name="quantity"
                          id="quantity"
                          placeholder="Enter"
                          value={quantity.plantCount}
                          onChange={(e) => addPlant(e, plant.id)}
                        />

                        {/* <p className="number-of-item">0</p> */}
                      </form>

                      <button
                        className="add-item"
                        form="override-cart-value_form"
                        onClick={() => {
                          setQuanity((prevData) => ({
                            plantCount: prevData.plantCount + 1,
                            plantId: plant.id,
                          }));
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <defs>
                            <path
                              d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                              id="b"
                            />
                          </defs>
                          <use
                            fill="#06c179"
                            fillRule="nonzero"
                            xlinkHref="#b"
                          />
                        </svg>
                      </button>
                    </div>
                    <button
                      className="add-to-cart--bnt"
                      onClick={() => {
                        navigate("/checkout");
                        buyNow(plant.id);
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      className="add-to-cart--bnt"
                      onClick={() => addToCart(plant.id)}
                    >
                      <svg
                        className="add-to-cart--svg"
                        width="22"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                          fill="#69707D"
                          fillRule="nonzero"
                        />
                      </svg>
                      <span>
                        Add to cart{" "}
                        {cart[plant.id].itemCount !== 0 && `(${cart[plant.id].itemCount})`}
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
    </div>
  );
}

export default Plant;