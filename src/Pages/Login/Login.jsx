import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginCSS from "./Login.module.css";

import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

function Login() {
  const [formState, setFormState] = useState({
    userName: "",
    password: "",
    showPass: false,
  });

  const [formErrors, setFormErrors] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  function handleChange(e) {
    const target = e.target;
    const { name, value, type, checked } = target;

    setFormState((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  console.log(formErrors);

  function handleSubmit(e) {
    e.preventDefault();

    let errors = {};
    let isValid = true;

    if (formState.userName.trim() == "") {
      errors.text = "Text field is required.";
      isValid = false;
    }

    if (formState.userName != "user" && formState.password != "pass") {
      errors.both = "both wrong.";
      isValid = false;
    }

    setFormErrors(errors);

    if (isValid) {
      // Submit the form
      navigate(location.state?.prevUrl || "/product");
      console.log("Form submitted:", formState);
    }
  }

  return (
    <section className={LoginCSS["portal"]}>
      <form
        action="#"
        onSubmit={handleSubmit}
      >
        <div className={LoginCSS["title"]}>
          <h1>LOG IN</h1>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <button id={LoginCSS["google-signin"]}>
          <img
            src="assets/google-logo.svg"
            alt=""
          />
          Log in with Google
        </button>
        <span>or</span>
        <div className={LoginCSS["input-field"]}>
          <input
            type="text"
            id="username"
            placeholder=""
            name="userName"
            value={formState.userName}
            onChange={handleChange}
          />
          <p htmlFor="username">Username</p>
        </div>
        <div className={LoginCSS["input-field"]}>
          <input
            type={formState.showPass ? "text" : "password"}
            id="password"
            placeholder=""
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
          <p htmlFor="password">Password</p>

          <label
            htmlFor="hide-show"
            id={LoginCSS["show-hide-pass"]}
          >
            {formState.showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
          </label>

          <input
            type="checkbox"
            name="showPass"
            id="hide-show"
            className={LoginCSS["hide-show"]}
            checked={formState.showPass}
            onChange={handleChange}
          />

          {/* <img
            id={LoginCSS["show-hide-pass"]}
            src="assets/show-eye.svg"
            alt=""
          /> */}
        </div>
        <a
          href="#"
          id={LoginCSS["forgot-pass"]}
        >
          Forgot Password
        </a>
        <button id={LoginCSS["signin"]}>Sign in</button>
        <p id={LoginCSS["signup"]}>
          Don't have an account?
          <a href="#">Sign up here</a>
        </p>
      </form>
    </section>
  );
}

export default Login;
