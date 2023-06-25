import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalContext } from "../AppContext/AppContext";

function Checkout() {
  const navigate = useNavigate();
  const { plants, cart, getTotalAmount, setPlants, setCart, checkout} = useGlobalContext();
  const modalRef = useRef();
  const [userData, setUserData] = useState(null);
  //   console.log(userData?.firstName);
  const schema = yup.object().shape({
    // firstName: yup.number().typeError('Age must be a number').required("First Name Required!"),
    firstName: yup.string().required("First Name Required!"),
    lastName: yup.string().required(),
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
    setUserData(data);
    modalRef.current.close();
  }

  function submitOrder() {
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
    <div>
      <button
        onClick={() => {
          modalRef.current.showModal();
        }}
      >
        Open Modal
      </button>

      <dialog ref={modalRef}>
        <form
          action=""
          onSubmit={handleSubmit(submitForm)}
        >
          <div>
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
            />
            <p>{errors.firstName?.message}</p>
          </div>

          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </dialog>

      <p>{userData?.firstName}</p>
      {plants.map((plant) => {
        if (cart[plant.id].itemCount !== 0 && checkout.includes(plant.id)) {
          return (
            <div key={plant.id}>
              <p>
                {plant.name} x {cart[plant.id].itemCount}
              </p>

              <span>SubTotal {cart[plant.id].itemCount * plant.price}</span>
            </div>
          );
        }
      })}
      <p>Total Amount: {getTotalAmount()}</p>
      <button onClick={submitOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;
