import React from "react";
import Header from "../../../SharedModule/components/Header/Header";
import usersListImg from "../../../assets/images/usersListImg.png";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noData from "../../../assets/images/no-data.png";

export default function UpateCategory({categoryId , updateCategoryById }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        className="btn btn-success mx-3"
        onClick={() => {
          handleShow();
        }}
      >
        Update
      </button>

      <Modal show={show} onHide={handleClose}>
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Update Item</h3>
            <i
              className="fa-regular fa-circle-xmark text-danger fa-lg"
              role="button"
              onClick={handleClose}
            ></i>
          </div>
          <Modal.Body>
            <form className="pt-5 mt-5">
              <div className="input-group flex-nowrap mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  aria-label="Enter name"
                  aria-describedby="addon-wrapping"
                //   {...register("name", {
                //     required: "name is required",
                //   })}
                />
              </div>
              {/* {errors.name && (
                <p className="alert alert-danger">{errors.name.message}</p>
              )} */}

              <div className="text-end mt-4">
                <button className="w-25 btn btn-success" onClick={() => {
                    updateCategoryById(categoryId  )
                }}>Update</button>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
