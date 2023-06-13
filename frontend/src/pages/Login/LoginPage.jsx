import "./login-page-style.css";
import { useFormik } from "formik";
import { loginValidation } from "../../validation/login-validation";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { authUserActions } from "../../store/authUser";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,

    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        const response = await axios.post("/auth/login", values);
        const data = response.data;
        localStorage.setItem("token", data.token);
        const decodedToken = jwt_decode(data.token);
        dispatch(authUserActions.login());
        dispatch(authUserActions.setUserInfo(decodedToken));
        navigate("/chat");
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    },
  });
  return (
    <div className=" d-flex justify-content-center justify-align-items-center">
      <div className=" login-box">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="login-title">Hello you can login here</h2>
          <label className="login-label">Email </label>
          <br />
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <br />
          {formik.touched.email && formik.errors.email ? (
            <p className="error-validate">{formik.errors.email}</p>
          ) : null}

          <br />
          <label className="login-label">Password </label>
          <br />
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <br />
          {formik.touched.password && formik.errors.password ? (
            <p className="error-validate">{formik.errors.password}</p>
          ) : null}
          <br />
          <br />

          {errorMessage !== "" && (
            <p className="error-validate">{errorMessage}</p>
          )}
          <button className="login-btn " type="submit">
            Login
          </button>

          <p className="go-to-register-p">
            <Link to="/register" className="go-to-register-link">
              You don't have account?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
