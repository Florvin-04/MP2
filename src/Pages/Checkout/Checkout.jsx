import React, { useEffect, useRef, useState } from "react";
import checkoutCSS from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalContext } from "../../AppContext/AppContext";
import { forEach } from "lodash";

function Checkout() {
  const navigate = useNavigate();
  const {
    plants,
    cart,
    getTotalAmount,
    userInfo,
    setCart,
    setCheckout,
    checkout,
    orders,
    setOrders,
  } = useGlobalContext();
  const modalRef = useRef();
  const [userData, setUserData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phoneNumber: userInfo.phoneNumber,
    zipCode: userInfo.zipCode,
    address: userInfo.address,
  });

  const schema = yup.object().shape({
    // firstName: yup.number().typeError('Age must be a number').required("First Name Required!"),
    firstName: yup.string().required("First Name is Required."),
    lastName: yup.string().required("Last Name is Required."),
    phoneNumber: yup
      .number()
      .typeError("Must be a number.")
      .positive()
      .integer()
      .required("Phone Number is Required."),
    zipCode: yup.number().typeError("Must be a number.").required(),
    address: yup.string().required(),
  });

  function onSubmit(values) {
    console.log("Address Complete");
    setUserData(values);
    modalRef.current.close();
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      ...userData,
      // firstName: userInfo.firstName,
      // lastName: userInfo.lastName,
      // phoneNumber: userInfo.phoneNumber,
      // zipCode: userInfo.zipCode,
      // address: userInfo.address,
    },
    validationSchema: schema,
    onSubmit,
  });

  function submitOrder() {
    // if (!userData) {
    //   alert("Adrress is Required");
    //   return;
    // }

    console.log("order Submit");
    plants.map((plant) => {
      if (cart[plant.id].itemCount !== 0 && checkout.includes(plant.id)) {
        // let newOrder = {
        //   id: plant.id,
        //   address: userData.address,
        //   zipCode: userData.zipCode,
        //   itemCount: cart[plant.id].itemCount,
        // };

        setOrders([...orders, { id: [...checkout], address: userData.address }]);

        // setOrders((prevOrders) => [
        //   ...prevOrders,
        //   { id: [...checkout], address: userData.address },
        // ]);

        setCart((prevData) => ({
          ...prevData,
          [plant.id]: {
            availability: prevData[plant.id].availability - prevData[plant.id].itemCount,
            itemCount: 0,
          },
        }));
      }
    });

    setCheckout([]);
    navigate("/product");
  }

  return (
    <div className={`container ${checkoutCSS["checkout__parent"]}`}>
      <dialog ref={modalRef}>
        Delivery Details
        <form
          className={checkoutCSS["address__form"]}
          action=""
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="firstName">First Name: </label>
            <input
              className={errors.firstName ? checkoutCSS["input__error"] : ""}
              type="text"
              id="firstName"
              placeholder="ex. Juan"
              // {...register("firstName")}
              value={values.firstName}
              onChange={handleChange}
            />

            <p>{errors.firstName}</p>
          </div>

          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              className={errors.lastName ? checkoutCSS["input__error"] : ""}
              type="text"
              id="lastName"
              placeholder="ex. dela Cruz"
              // {...register("lastName")}
              value={values.lastName}
              onChange={handleChange}
            />
            <p>{errors.lastName}</p>
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
              className={errors.phoneNumber ? checkoutCSS["input__error"] : ""}
              type="text"
              id="phoneNumber"
              placeholder="094512345678"
              // {...register("phoneNumber")}
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <p>{errors.phoneNumber}</p>
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              className={errors.zipCode ? checkoutCSS["input__error"] : ""}
              type="text"
              id="zipCode"
              placeholder="4112"
              maxLength="4"
              // {...register("baranggay")}
              value={values.zipCode}
              onChange={handleChange}
            />
            <p>{errors.baranggay}</p>
          </div>

          <div>
            <label htmlFor="address">Complete Address: </label>
            <input
              className={errors.address ? checkoutCSS["input__error"] : ""}
              type="text"
              id="address"
              placeholder="ex. 185 De Leon St. "
              // {...register("address")}
              value={values.address}
              onChange={handleChange}
            />
            <p>{errors.streetNo}</p>
          </div>

          <button
            type="submit"
            className={checkoutCSS["submit__address__form"]}
          >
            submit
          </button>
          <button
            type="button"
            onClick={() => modalRef.current.close()}
          >
            Cancel
          </button>
        </form>
      </dialog>

      <div className="address__container">
        <div className={checkoutCSS["change__address"]}>
          <p>Address Delivery</p>
          <button
            onClick={() => {
              modalRef.current.showModal();
            }}
          >
            {true ? "Change Address" : "Add Adress"}
          </button>
        </div>

        {true ? (
          <div>
            <p className="person__name">
              {userData?.firstName} {userData?.lastName} | {userData?.phoneNumber}
            </p>
            <p className="complete__address">
              {userData?.address} | {userData.zipCode}
            </p>
          </div>
        ) : (
          <p>Address Is Required</p>
        )}
      </div>

      <div className={checkoutCSS["checkout__container--parent"]}>
        <div className={checkoutCSS["checkout__items--container"]}>
          {plants.map((plant) => {
            if (cart[plant.id].itemCount !== 0 && checkout.includes(plant.id)) {
              return (
                <div
                  key={plant.id}
                  className={checkoutCSS["checkout__wrapper"]}
                >
                  <div
                    key={plant.id}
                    className={checkoutCSS["checkout__items"]}
                  >
                    <img
                      src={plant.img}
                      alt={plant.name}
                    />
                    <div className={checkoutCSS["checkout__item--details"]}>
                      <div className={checkoutCSS["item__descripttion"]}>
                        <p className={checkoutCSS["item--name"]}>{plant.name}</p>
                        <p className="category">{plant.family} Plant</p>
                      </div>
                      <p className={checkoutCSS["item--price"]}>
                        PHP {plant.price} <span>x {cart[plant.id].itemCount}</span>
                      </p>
                    </div>
                  </div>
                  <p className={checkoutCSS["checkout__subtotal"]}>
                    SubTotal {cart[plant.id].itemCount * plant.price}{" "}
                  </p>
                </div>
              );
            }
          })}
        </div>

        <div className={checkoutCSS["checkout__totalAmount"]}>
          <p>
            Merchendise subtotal: <span>₱{getTotalAmount()}</span>
          </p>
          <p>
            Shipping fee subtotal: <span>Free</span>
          </p>
          <p>
            Total Payment: <span>₱{getTotalAmount()}</span>
          </p>
          <button
            className={`btn btn-primary ${checkoutCSS["checkout_submit_btn"]}`}
            onClick={submitOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
