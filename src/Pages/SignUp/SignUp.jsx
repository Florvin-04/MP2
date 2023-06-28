import React, { useState } from "react";
import "./SignUp.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function SignUp() {
  const [page, setPage] = useState(1);

  const schema = yup.object().shape({
    // firstName: yup.number().typeError('Age must be a number').required("First Name Required!"),
    email: yup.string().email().required("Email is Required"),
    username: yup.string().required("Username is Required"),
    firstName: yup.string().required("First Name is Required"),
    // lastName: yup.string().required("Last Name is Required"),
    // birthdate: yup
    //   .date()
    //   .required("Birthdate is Required.")
    //   .max(new Date(), "Birthdate must be in the past."),
    // phoneNo: yup.number(),
    // zipCode: yup.number(),
    // address: yup.string().required("Last Name is Required"),
    // password: yup.string().required(),
    // confirmPassword: yup
    //   .string()
    //   .oneOf([yup.ref("password"), null])
    //   .required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function submitFormRegistration(data) {
    console.log(data);
    if (page !== 3) {
      setPage((prev) => prev + 1);
      return;
    }

    alert("Account Created");
  }

  return (
    <section id="signup">
      <form
        action="#"
        method="POST"
        className="form"
        onSubmit={handleSubmit(submitFormRegistration)}
      >
        <div className="progresss">
          <div className={`progresss-bar active ${page === 1 && "current"}`}>
            <span>
              <img
                src="image/envelope.svg"
                alt=""
              />
            </span>
          </div>
          <div className={`progresss-bar  ${page >= 2 && "active"} ${page === 2 && "current"}`}>
            <span>
              <img
                src="image/person.svg"
                alt=""
              />
            </span>
          </div>
          <div className={`progresss-bar  ${page >= 3 && "active"} ${page === 3 && "current"}`}>
            <span>
              <img
                src="image/lock.svg"
                alt=""
              />
            </span>
          </div>
        </div>

        <div className="pages">
          {page === 1 && (
            <div className={`page active`}>
              <h1>Let's get started</h1>
              <div className="field">
                <div className="field-input">
                  <label htmlFor="email">
                    <span>*</span>Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="e.g. sample@email.com"
                    required
                    {...register("email")}
                  />
                  {errors.email?.message}
                </div>
                <div className="field-input">
                  <label htmlFor="uname">
                    <span>*</span>Username
                  </label>
                  <input
                    type="text"
                    id="uname"
                    placeholder="e.g. gab613"
                    required
                    {...register("username")}
                  />
                </div>
              </div>
              <div className="btn">
                <button
                  type="submit"
                  id="next-btn"
                >
                  <img
                    src="image/caret-right-fill.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          )}
          {page === 2 && (
            <div className={`page active`}>
              <h1>Add a personal touch</h1>
              <div className="field">
                <div className="field-input">
                  <div className="field-group">
                    <div className="fname-input">
                      <label htmlFor="fname">
                        <span>*</span>First Name
                      </label>
                      <input
                        type="text"
                        id="fname"
                        placeholder="e.g. John"
                        require
                        {...register("firstName")}
                      />
                    </div>
                    <div className="lname-input">
                      <label htmlFor="fname">
                        <span>*</span>Last Name
                      </label>
                      <input
                        type="text"
                        id="fname"
                        placeholder="e.g. Doe"
                        required
                        // {...register("lastName")}
                      />
                    </div>
                  </div>
                </div>
                <div className="field-input">
                  <label htmlFor="bdate">
                    <span>*</span>Birthdate
                  </label>
                  <input
                    type="date"
                    id="bdate"
                    required
                    // {...register("birthdate")}
                  />
                </div>
                <div className="field-group">
                  <div className="phonenum-input">
                    <label htmlFor="phone-num">
                      <span>*</span>Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone-num"
                      placeholder="+63 9386759145"
                      required
                      //   {...register("phoneNo")}
                    />
                  </div>
                  <div className="zip-input">
                    <label htmlFor="zip">
                      <span>*</span>ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      placeholder="e.g. Doe"
                      size="4"
                      required
                      //   {...register("zipCode")}
                    />
                  </div>
                </div>
                <div className="field-input">
                  <label htmlFor="address">
                    <span>*</span>Complete Address
                  </label>
                  <input
                    type="text"
                    id="addr"
                    placeholder="San. Juan Street"
                    required
                    // {...register("address")}
                  />
                </div>
              </div>
              <div className="btn">
                <button
                  type="button"
                  id="prev-btn"
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <img
                    src="image/caret-left-fill.svg"
                    alt=""
                  />
                </button>
                <button
                  type="submit"
                  id="next-btn"
                >
                  <img
                    src="image/caret-right-fill.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          )}
          {page === 3 && (
            <div className={`page active`}>
              <h1>Secure your account</h1>
              <div className="field">
                <div className="field-input">
                  <label htmlFor="password">
                    <span>*</span>Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                    // {...register("password")}
                  />
                  <img
                    className="show-hide-pass"
                    src="image/eye-fill.svg"
                    alt=""
                  />
                </div>
                <div className="field-input">
                  <label htmlFor="confirmpass">
                    <span>*</span>Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmpass"
                    placeholder="Confirm Password"
                    // {...register("confirmPassword")}
                  />
                  <img
                    className="show-hide-pass"
                    src="image/eye-slash-fill.svg"
                    alt=""
                  />
                  {errors.confirmPassword?.message}
                </div>
              </div>
              <div className="btn">
                <button
                  type="button"
                  id="prev-btn"
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <img
                    src="image/caret-left-fill.svg"
                    alt=""
                  />
                </button>
                <button
                  type="submit"
                  id="submit-btn"
                >
                  Sign up
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}

export default SignUp;
