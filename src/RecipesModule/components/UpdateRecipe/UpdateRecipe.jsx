import React, { useEffect, useState } from "react";
import HeaderRecipe from "../../../SharedModule/components/HeaderRecipe/HeaderRecipe";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function UpdateRecipe() {
  // useSearchParam >>>>>
  const action = useParams();

  const isAddAction = action === "add";
  const isUpdateAction = action === "update";
  const [categorisList, setcategorisList] = useState([]);
  const [tagsList, settagsList] = useState([]);
  const recipeId = JSON.parse(localStorage.getItem("recipeId"));

  // const name = JSON.parse(localStorage.getItem("name"));
  // const description = JSON.parse(localStorage.getItem("description"));
  // const price = JSON.parse(localStorage.getItem("price"));
  // const imagePath = JSON.parse(localStorage.getItem("imagePath"));
  // const categoryName = JSON.parse(localStorage.getItem("categoryName"));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };

  const appendToFormDataUpdated = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", +data.tagId);
    formData.append("categoriesIds", +data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };

  useEffect(() => {
    // Function to set initial values from localStorage
    const setInitialValues = () => {
      setValue("name", JSON.parse(localStorage.getItem("name")));
      setValue("description", JSON.parse(localStorage.getItem("description")));
      setValue("price", JSON.parse(localStorage.getItem("price")));
      setValue(
        "categoriesIds",
        JSON.parse(localStorage.getItem("categoriesIds"))
      );
      setValue("tagId", JSON.parse(localStorage.getItem("tagId")));
    };

    // Call the function to set initial values
    setInitialValues();
  }, []); // Empty dependency array ensures this useEffect runs only once

  // handle axios (call api)
  const onSubmitAdd = async (data) => {
    console.log(data);
    let recipesFormData = appendToFormData(data);
    let token = localStorage.getItem("adminToken");
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        recipesFormData,
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      console.log(response);
      // toast.success
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const getCategoriesList = async () => {
    // console.log(data);
    let token = localStorage.getItem("adminToken");

    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      setcategorisList(categoriesList.data.data);

      // console.log(categoriesList.data.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const getTagsList = async () => {
    // console.log(data);
    let token = localStorage.getItem("adminToken");

    try {
      let tagsList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag",
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      settagsList(tagsList.data);
      console.log(tagsList.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const onSubmitUpdate = async (data) => {
    let recipesFormDataUpdated = appendToFormDataUpdated(data);

    console.log(recipeId);
    // console.log('update data',data);
    let token = localStorage.getItem("adminToken");
    try {
      let response = await axios.put(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`,
        recipesFormDataUpdated,
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      console.log(response);
      // toast.success
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };


  useEffect(() => {
    getCategoriesList();
    getTagsList();
  }, []);

  return (
    <>
      <ToastContainer />

      <HeaderRecipe />

      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmitUpdate)} className="pt-5 mt-5">
          <div className="input-group flex-nowrap mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter recipe name"
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

          <div className="input-group flex-nowrap mb-3">
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter description"
              aria-label="Enter your description"
              aria-describedby="addon-wrapping"
              {...register("description", {
                required: "description is required",
              })}
            ></textarea>
          </div>
          {errors.description && (
            <p className="alert alert-danger">{errors.description.message}</p>
          )}

          <div className="input-group flex-nowrap mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter price "
              aria-label="Enter your price "
              aria-describedby="addon-wrapping"
              {...register("price", {
                required: "price  is required",
              })}
            />
          </div>
          {errors.price && (
            <p className="alert alert-danger">{errors.price.message}</p>
          )}

          <div className="input-group flex-nowrap mb-3">
            <select
              className="form-control"
              {...register("categoriesIds", {
                required: "categories is required",
              })}
            >
              {categorisList?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {errors.categoriesIds && (
            <p className="alert alert-danger">{errors.categoriesIds.message}</p>
          )}

          <div className="input-group flex-nowrap mb-3">
            <select
              className="form-control"
              name=""
              id=""
              {...register("tagId", {
                required: "categories is required",
              })}
            >
              {tagsList?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          {errors.tagId && (
            <p className="alert alert-danger">{errors.tagId.message}</p>
          )}

          <div className="input-group flex-nowrap mb-3">
            <input
              type="file"
              className="form-control"
              placeholder="Enter image"
              aria-label="Enter your img"
              aria-describedby="addon-wrapping"
              {...register("recipeImage", {
                required: "img is required",
              })}
            />
          </div>
          {errors.recipeImage && (
            <p className="alert alert-danger">{errors.recipeImage.message}</p>
          )}

          <div className="text-end">
            <button className="w-25 btn btn-success" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
