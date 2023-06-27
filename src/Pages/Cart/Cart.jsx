import React, { useState } from "react";
import CartCSS from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../AppContext/AppContext";

function Cart() {
  const {
    plants,
    cart,
    setCart,
    addToCart,
    removeToCart,
    updateCartValue,
    getTotalAmount,
    setCheckout,
    checkout,
  } = useGlobalContext();

  const navigate = useNavigate();

  function handleChange(e, id) {
    const target = e.target;
    const { name, checked, type, value } = target;

    const updateList =
      checked && type == "checkbox" ? [...checkout, id] : checkout.filter((ids) => ids !== id);

    setCheckout(updateList);
  }

  function removeItem(id) {
    setCart((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        itemCount: 0,
      },
    }));
  }

  return (
    <div className={`${CartCSS["plant__wrapper"]} container`}>
      {plants.map((plant) => {
        if (cart[plant.id].itemCount !== 0) {
          return (
            <div key={plant.id} className={`${CartCSS["parentCartContainer"]}`}>
              <div className={CartCSS["cart__container"]}>
                <input
                  type="checkbox"
                  name={plant.id}
                  id={plant.name}
                  checked={checkout.includes(plant.id)}
                  onChange={(e) => handleChange(e, plant.id)}
                />
                <label
                  htmlFor={plant.name}
                  className={`${CartCSS["cart_item-container"]} ${
                    checkout.includes(plant.id) ? CartCSS["active"] : ""
                  }`}

                  // style={{ backgroundColor: "red" }}
                >
                  <div className={CartCSS["cart__image--container"]}>
                    <img
                      src={plant.img}
                      alt={plant.name}
                      width="140px"
                    />
                  </div>

                  <div className={CartCSS["cart__description--container"]}>
                    <div className={CartCSS["plant__info"]}>
                      <p className={CartCSS["plant_name"]}>{plant.name}</p>
                      <p className={CartCSS["plant_price"]}>PHP {plant.price}</p>
                    </div>
                    <div className={CartCSS["handleChangeContainer"]}>
                      <div>
                        <button onClick={() => removeToCart(plant.id)}>
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

                        <input
                          type="text"
                          name="cartInput"
                          value={cart[plant.id].itemCount}
                          size={5}
                          // value={cartValue.cartInput || cart[plant.id].itemCount}
                          onChange={(e) => updateCartValue(Number(e.target.value), plant.id)}
                        />

                        <button onClick={(e) => addToCart(plant.id)}>
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

                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeItem(plant.id)}
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <p className={CartCSS["sub_total"]}>
                SubTotal: {cart[plant.id].itemCount * plant.price}
              </p>
            </div>
          );
        }
      })}

      {getTotalAmount() ? (
        <div  className={CartCSS["checkout"]}>
          <p className={CartCSS["total_amount"]}>Total Amount: {getTotalAmount()}</p>
          <button
          className="btn btn-primary"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <p>Select Item to checkout</p>
      )}
    </div>
  );
}

export default Cart;

// updateCartValue(Number(e.target.value), plant.id)
