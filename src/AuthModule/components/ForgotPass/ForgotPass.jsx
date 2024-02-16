import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPass() {
  const navigate = useNavigate();
  // register ...return data of form
  // call when click on button of login
  // formState return errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle axios (call api)
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Reset/Request",
        data
      );
      // setTimeout(() => toast.success("success login"), 100);
      navigate("/reset-pass");
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="Auth-container">
        <div className="overlay container-fluid">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5">
              <div className="login bg-white rounded-3 px-5 py-4">
                <div className="logo-container text-center">
                  <img src={logo} alt="food-logo" className="w-50" />
                </div>
                <h2 className="fw-bolder">Forgot Your Password?</h2>
                <p className="text-muted">
                  No worries! Please enter your email and we will send a
                  password reset link
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Email"
                      aria-label="Enter your Email"
                      aria-describedby="addon-wrapping"
                      {...register("email", {
                        required: "email is required",
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "email is invaild",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}

                  <button className="btn btn-success w-100">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
