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
import DeleteCategory from "../DeleteCategory/DeleteCategory";
import UpateCategory from "../UpdateCategory/UpateCategory";

export default function CategoriesList() {
  const [categorisList, setcategorisList] = useState([]);
  const [show, setShow] = useState(false);
  const [pages, setpages] = useState([]);
  const [searchName, setsearchName] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle axios (call api)
  const onSubmit = async (data) => {
    console.log(data);

    // this way needs asynch
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Category/",
        data
      );
      console.log(response);
      getCategoriesList();
      handleClose();
    } catch (error) {
      console.log(error.response.data.message);
      // toast.error(error.response.data.message);
    }
  };

  const getCategoriesList = async (pageNo, pageSize, name) => {
    // console.log(data);
    let token = localStorage.getItem("adminToken");

    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/",
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
          params: {
            pageNumber: pageNo,
            pageSize: pageSize,
            name: name,
          },
        }
      );
      setpages(
        Array(categoriesList.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setcategorisList(categoriesList.data.data);
      // console.log(categoriesList.data.data);
    } catch (error) {
      console.log(error.response);
      // toast.error(error.response.data.message);
    }
  };

  const deleteCategoryById = async (id) => {
    console.log(id);
    let token = localStorage.getItem("adminToken");

    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Category/${id}`,
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      console.log(response);
      getCategoriesList();
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const getNameValue = (input) => {
    // console.log(input.target.value);
    setsearchName(input.target.value);
    getCategoriesList(1, 5, input.target.value);
  };

  useEffect(() => {
    getCategoriesList(1, 5, searchName);
  }, []);

  return (
    <>
      <Header
        title={`Categories Items`}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        headerBg={usersListImg}
      />

      <div className=" d-flex justify-content-between align-items-center m-3 p-3">
        <div className="">
          <h4>Categories Table Details</h4>
          <p className="text-muted">You can check all details</p>
        </div>

        <div>
          <button className="btn btn-success" onClick={handleShow}>
            Add New Catrgory
          </button>
        </div>
      </div>

      <div className="row px-4 py-2">
        <div className="col-md-6">
          <input type="text" className="form-control" onChange={getNameValue} />
        </div>
      </div>

      <div className="table-container my-3">
        {categorisList.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categorisList.map((category) => (
                  <tr key={category.id}>
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td>
                      <UpateCategory
                        categoryName={category.name}
                        categoryId={category.id}
                        getCategoriesList={getCategoriesList}
                      />
                      <DeleteCategory
                        categoryId={category.id}
                        deleteCategoryById={deleteCategoryById}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                {pages.map((page) => (
                  <li
                    key={page}
                    className="page-item"
                    onClick={() => getCategoriesList(page, 5)}
                  >
                    <a className="page-link">{page}</a>
                  </li>
                ))}
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className="text-center">
            <img src={noData} alt="" />
            <h4 className="my-3">No Data !</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />Natus, est neque?
            </p>
          </div>
        )}
      </div>

      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Add Category</h3>
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
                  placeholder="Enter your name"
                  aria-label="Enter your name"
                  aria-describedby="addon-wrapping"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="alert alert-danger">{errors.name.message}</p>
              )}

              <div className="text-end">
                <button className="w-25 btn btn-success">Save</button>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
