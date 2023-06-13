import "./register-style.css";
import axios from "axios";
import { registerValidation } from "../../validation/register-validation";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useState } from "react";
export default function Register() {
  const [successMsg, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: registerValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("auth/register", values);
        if (res) {
          setSuccessMessage(
            "You logged in Successfuly , You will move to login Page..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleNavigateToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className=" d-flex justify-content-center justify-align-items-center">
      <div className="register-box">
        <form onSubmit={formik.handleSubmit}>
          <h2 className="register-title">Hello you can Register Here</h2>
          <label className="register-label">Email </label>
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
          <label className="register-label">Password </label>
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
          <label className="register-label">Name </label>
          <br />
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <br />
          {formik.touched.name && formik.errors.name ? (
            <p className="error-validate">{formik.errors.password}</p>
          ) : null}
          <br />

          <button className="login-btn " type="submit">
            Register
          </button>
          <br />
          <br />
          {successMsg && <p className="success-p-register">{successMsg}</p>}
          <br />
          <p
            className="navigate-to-login-p"
            onClick={handleNavigateToLoginPage}
          >
            Already have account ?
          </p>
        </form>
      </div>
    </div>
  );
}
