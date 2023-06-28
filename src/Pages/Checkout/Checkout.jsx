import React, { useRef, useState } from "react";
import checkoutCSS from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalContext } from "../../AppContext/AppContext";

function Checkout() {
  const navigate = useNavigate();
  const { plants, cart, getTotalAmount, setPlants, setCart, checkout } = useGlobalContext();
  const modalRef = useRef();
  const [userData, setUserData] = useState(null);
  //   console.log(userData?.firstName);
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
    // .test("len", "Must be exactly 5 characters", (val) => val.length === 5),
    // buildingNumber: yup.number().positive().integer(),
    province: yup.string().required("Province is Required."),
    city: yup.string().required("City is Required."),
    baranggay: yup.string().required("Baranggay is Required."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function submitForm(data) {
    console.log("Submit");
    console.log(data);
    setUserData(data);
    modalRef.current.close();
  }

  function submitOrder() {
    
    if(!userData){
      alert("Adrress is Required")
      return 
    }
    
    console.log("order Submit");
    plants.map((plant) => {
      if (cart[plant.id].itemCount !== 0 && checkout.includes(plant.id)) {
        setCart((prevData) => ({
          ...prevData,
          [plant.id]: {
            itemCount: 0,
            availability: prevData[plant.id].availability - prevData[plant.id].itemCount,
          },
        }));
      }
    });

    console.log(cart);

    navigate("/product");
  }

  return (
    <div className={`container ${checkoutCSS["checkout__parent"]}`}>
      <dialog ref={modalRef}>
        Delivery Details
        <form
          className={checkoutCSS["address__form"]}
          action=""
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <label htmlFor="firstName">First Name: </label>
            <input
              className={errors.firstName?.message ? checkoutCSS["input__error"] : ""}
              type="text"
              id="firstName"
              placeholder="ex. Juan"
              {...register("firstName")}
            />
            <p>{errors.firstName?.message}</p>
          </div>

          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              className={errors.lastName?.message ? checkoutCSS["input__error"] : ""}
              type="text"
              id="lastName"
              placeholder="ex. dela Cruz"
              {...register("lastName")}
            />
            <p>{errors.lastName?.message}</p>
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
              className={errors.phoneNumber?.message ? checkoutCSS["input__error"] : ""}
              type="text"
              id="phoneNumber"
              placeholder="094512345678"
              {...register("phoneNumber")}
            />
            <p>{errors.phoneNumber?.message}</p>
          </div>

          <div>
            <label htmlFor="province">Province: </label>
            <input
              className={errors.province?.message ? checkoutCSS["input__error"] : ""}
              type="text"
              id="province"
              placeholder="ex. Cavite"
              {...register("province")}
            />
            <p>{errors.province?.message}</p>
          </div>

          <div>
            <label htmlFor="city">City: </label>
            <input
              className={errors.city?.message ? checkoutCSS["input__error"] : ""}
              type="text"
              id="city"
              placeholder="ex. Dasma"
              {...register("city")}
            />
            <p>{errors.city?.message}</p>
          </div>

          <div>
            <label htmlFor="baranggay">Baranggay: </label>
            <input
              className={errors.baranggay?.message ? checkoutCSS["input__error"] : ""}
              type="text"
              id="baranggay"
              placeholder="ex. Poblacion III"
              {...register("baranggay")}
            />
            <p>{errors.baranggay?.message}</p>
          </div>

          <div>
            <label htmlFor="streetNo">Street No, Bulding, House No: </label>
            <input
              className={errors.streetNo?.message ? checkoutCSS["input__error"] : ""}
              type="text"
              id="streetNo"
              placeholder="ex. 185 De Leon St. "
              {...register("streetNo")}
            />
            <p>{errors.streetNo?.message}</p>
          </div>

          <button type="submit" className={checkoutCSS["submit__address__form"]}>submit</button>
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
            {userData ? "Change Address" : "Add Adress"}
          </button>
        </div>

        {userData ? (
          <div>
            <p className="person__name">
              {userData?.firstName} {userData?.lastName} | {userData?.phoneNumber}
            </p>
            <p className="complete__address">
              {userData?.streetNo} {userData?.baranggay}, {userData?.city} {userData?.province}
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
