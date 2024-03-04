import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  // register ...return data of form
  // call when click on button of login
  // formState return errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };

  // handle axios (call api)
  const onSubmit = async (data) => {
    console.log(data);
    let registerFormData = appendToFormData(data);
    let token = localStorage.getItem("adminToken");
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Register",
        registerFormData,
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      console.log(response);
      navigate('/verification')
      // toast.success
    } catch (error) {
      console.log(error.response.data.message);
      // toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="Auth-container">
        <div className="overlay container-fluid">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-7">
              <div className="login bg-white rounded-3 px-5 py-4">
                <div className="logo-container text-center">
                  <img src={logo} alt="food-logo" className="w-50" />
                </div>
                <h3> Register</h3>
                <p className="text-muted">
                  Welcome back! please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      {/* userName  */}
                      <div className="input-group flex-nowrap mb-3">
                        <span className="input-group-text" id="addon-wrapping">
                          <i className="fa fa-user"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your userName "
                          aria-label="Enter your userName "
                          aria-describedby="addon-wrapping"
                          {...register("userName", {
                            required: "userName is required",
                          })}
                        />
                      </div>
                      {errors.userName && (
                        <p className="alert alert-danger">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      {/* email */}
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
                        <p className="alert alert-danger">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {/* country   */}
                      <div className="input-group flex-nowrap mb-3">
                        <span className="input-group-text" id="addon-wrapping">
                          <i className="fa fa-location"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your country  "
                          aria-label="Enter your country  "
                          aria-describedby="addon-wrapping"
                          {...register("country", {
                            required: "country  is required",
                          })}
                        />
                      </div>
                      {errors.country && (
                        <p className="alert alert-danger">
                          {errors.country.message}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      {/* phoneNumber  */}
                      <div className="input-group flex-nowrap mb-3">
                        <span className="input-group-text" id="addon-wrapping">
                          <i className="fa fa-phone"></i>
                        </span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter your phoneNumber "
                          aria-label="Enter your phoneNumber "
                          aria-describedby="addon-wrapping"
                          {...register("phoneNumber", {
                            required: "phoneNumber  is required",
                            // pattern: {
                            //   value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            //   message: "phoneNumber  is invaild",
                            // },
                          })}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="alert alert-danger">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      {/* password    */}
                      <div className="input-group flex-nowrap mb-3">
                        <span className="input-group-text" id="addon-wrapping">
                          <i className="fa fa-key"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your password   "
                          aria-label="Enter your password   "
                          aria-describedby="addon-wrapping"
                          {...register("password", {
                            required: "password  is required",
                          })}
                        />
                      </div>
                      {errors.password && (
                        <p className="alert alert-danger">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      {/* confirmPassword   */}
                      <div className="input-group flex-nowrap mb-3">
                        <span className="input-group-text" id="addon-wrapping">
                          <i className="fa fa-key"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your confirmPassword "
                          aria-label="Enter your confirmPassword  "
                          aria-describedby="addon-wrapping"
                          {...register("confirmPassword", {
                            required: "confirmPassword  is required",
                            // pattern: {
                            //   value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            //   message: "phoneNumber  is invaild",
                            // },
                          })}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="alert alert-danger">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      {/* profileImage    */}
                      <div className="input-group flex-nowrap mb-3">
                        <input
                          type="file"
                          className="form-control"
                          aria-label="Enter your profileImage"
                          aria-describedby="addon-wrapping"
                          {...register("profileImage")}
                        />
                      </div>
                      {errors.profileImage && (
                        <p className="alert alert-danger">
                          {errors.profileImage.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button className="btn btn-success w-100 my-4">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
