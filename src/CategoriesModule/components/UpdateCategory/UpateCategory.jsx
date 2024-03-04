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

export default function UpateCategory({categoryId , getCategoriesList , categoryName }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const updateCategoryById = async (id, updatedData) => {
    let token = localStorage.getItem("adminToken");
    
    try {
      await axios.put(
        `https://upskilling-egypt.com:443/api/v1/Category/${id}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Category updated successfully");
      toast.success("Category updated successfully");
      handleClose(); // Close the modal after successful update
      getCategoriesList()
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category. Please try again.");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    updateCategoryById(categoryId, data);
  };


  return (
    <>
      <button
        className="btn btn-success mx-3"
        onClick={() => {
          handleShow();
          console.log(categoryId);
          console.log(categoryName);
        }}
      >
        <i className="fa-solid fa-pen-to-square"></i>
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
            <form onSubmit={handleSubmit(onSubmit)} className="pt-5 mt-5">
              <div className="input-group flex-nowrap mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  aria-label="Enter name"
                  aria-describedby="addon-wrapping"
                  {...register("name", {
                    required: "name is required",
                  })}
                  defaultValue={categoryName}
                />
              </div>
              {errors.name && (
                <p className="alert alert-danger">{errors.name.message}</p>
              )}

              <div className="text-end mt-4">
                <button type="submit" className="w-25 btn btn-success">Update</button>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
