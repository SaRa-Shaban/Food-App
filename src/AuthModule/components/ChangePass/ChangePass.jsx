import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle axios (call api)
  const onSubmit = async (data) => {
    console.log(data);
    let token = localStorage.getItem('adminToken')
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword", data , {headers: {
          Authorization: token // "Authorization" should be spelled correctly
        }}
      );
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="login bg-white rounded-3 px-5 py-4">
        <div className="logo-container text-center">
          <img src={logo} alt="food-logo" className="w-75" />
        </div>
        <h3> Change Your Password</h3>
        <p className="text-muted">Please Enter Your Details below</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* old pass */}
          <div className="input-group flex-nowrap mt-4 mb-3">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder=" oldPassword"
              aria-label=" oldPassword"
              aria-describedby="addon-wrapping"
              {...register("oldPassword", {
                required: "oldPassword is required",
              })}
            />
          </div>
          {errors.oldPassword && (
            <p className="alert alert-danger">{errors.oldPassword.message}</p>
          )}

          {/* newPassword */}
          <div className="input-group flex-nowrap mt-4 mb-3">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder=" New password"
              aria-label=" New password"
              aria-describedby="addon-wrapping"
              {...register("newPassword", {
                required: "newPassword is required",
              })}
            />
          </div>
          {errors.newPassword && (
            <p className="alert alert-danger">{errors.newPassword.message}</p>
          )}

          {/* confirmed password*/}
          <div className="input-group flex-nowrap mt-4 mb-3">
            <span className="input-group-text" id="addon-wrapping">
              <i className="fa fa-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="confirmed New password"
              aria-label="confirmed New password"
              aria-describedby="addon-wrapping"
              {...register("confirmNewPassword", {
                required: "confirmNewPassword is required",
              })}
            />
          </div>
          {errors.confirmNewPassword && (
            <p className="alert alert-danger">
              {errors.confirmNewPassword.message}
            </p>
          )}

          <button className="btn btn-success w-100">Change Password</button>
        </form>
      </div>
    </>
  );
}
