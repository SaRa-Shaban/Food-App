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

export default function DeleteCategory({ deleteCategoryById, categoryId }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        className="btn btn-danger mx-3"
        onClick={() => {
          handleShow();
        }}
      >
        Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <div className="p-3">
          <div className="d-flex justify-content-end align-items-center">
            <i
              className="fa-regular fa-circle-xmark text-danger fa-lg"
              role="button"
              onClick={handleClose}
            ></i>
          </div>
          <Modal.Body>
          <div className="text-center">
            <img src={noData} alt="" />
            <h2 className="my-3">Delete this User</h2>
            <p className="my-3">
              are you sure you want to delete this item? if you are sure just{" "}
              <br /> click on delete it
            </p>
              <div className="text-end">
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteCategoryById(categoryId);
                }}
              >
                Delete this item
              </button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
