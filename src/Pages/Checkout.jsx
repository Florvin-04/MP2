import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalContext } from "../AppContext/AppContext";

function Checkout() {
  const { plants, cart, getTotalAmount } = useGlobalContext();
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
    // e.preventDefault();
    console.log("Submit");
    // console.log(data);
    setUserData(data);
    modalRef.current.close();
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
        if (cart[plant.id].itemCount !== 0) {
          return (
            <div key={plant.id}>
              <p>
                {plant.name} x{cart[plant.id].itemCount}
              </p>

              <span>SubTotal {cart[plant.id].itemCount * plant.price}</span>
            </div>
          );
        }
      })}
      <p>Total Amount: {getTotalAmount()}</p>
      <button>Place Order</button>
    </div>
  );
}

export default Checkout;
