import React, { useEffect, useState } from "react";
import usersListImg from "../../../assets/images/usersListImg.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/no-data.png";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function RecipesList() {
  console.log(JSON.parse(localStorage.getItem('adminData')));
  const adminData = JSON.parse(localStorage.getItem('adminData'))
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [rcipeId, setrcipeId] = useState(0);
  const [searchName, setsearchName] = useState("");
  const [selectedTagId, setselectedTagId] = useState(0);
  const [selectedCatId, setselectedCatId] = useState(0);
  const [categorisList, setcategorisList] = useState([]);
  const [tagsList, settagsList] = useState([]);
  const [pages, setpages] = useState([]);

  // const navigateToRecipesData = () => {
  //   localStorage.setItem('recipeId',JSON.stringify(rcipeId));
  //   console.log(rcipeId);
  //   navigate('/dashboard/recipes-data')
  // }

  // const navigateToRecipesData = (id) => {
  //   console.log(id);
  //   navigate("/dashboard/recipes-data");
  // };

  const getCategoriesList = async () => {
    // console.log(data);
    let token = localStorage.getItem("adminToken");

    try {
      let categoriesList = await axios.get("https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
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
      // console.log(tagsList.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const handleAddClick = () => {
    navigate("/dashboard/recipes-data?action=add");
  };

  const handleUpdateClick = () => {
    navigate(`/dashboard/recipes-data?action=update`);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseFav = () => setShowFav(false);
  const handleShowFav = () => setShowFav(true);

  const [recipeLists, setRecipeLists] = useState([]);

  const baseUrlImg = "https://upskilling-egypt.com/";

  const getrecipeList = async (pageNo, pageSize, name, tagId, catId) => {
    let token = localStorage.getItem("adminToken");
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:443/api/v1/Recipe/`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            pageSize: pageSize,
            pageNumber: pageNo,
            name: name,
            tagId: tagId,
            categoryId: catId,
          },
        }
      );
      // console.log(response.data.totalNumberOfPages);
      setpages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setRecipeLists(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNameValue = (input) => {
    // console.log(input.target.value);
    setsearchName(input.target.value);
    getrecipeList(1, 5, input.target.value, selectedTagId, selectedCatId);
  };

  const getTagIdValue = (select) => {
    // console.log(select.target.value);
    setselectedTagId(select.target.value);
    getrecipeList(1, 5, searchName, select.target.value, selectedCatId);
  };

  const getCatIdValue = (select) => {
    // console.log(select.target.value);
    setselectedCatId(select.target.value);
    getrecipeList(1, 5, searchName, selectedTagId, select.target.value);
  };

  useEffect(() => {
    getCategoriesList();
    getTagsList();
  }, []);

  useEffect(() => {
    getrecipeList(1, 5);
  }, []);

  const deleteRecipesById = async (id) => {
    console.log(id);
    let token = localStorage.getItem("adminToken");

    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${id}`,
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      console.log(response);
      getrecipeList();
      handleClose();
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  const AddRecipesByIdToFav = async (recipeId) => {
    console.log(recipeId);
    let token = localStorage.getItem("adminToken");

    try {
      let response = await axios.post(
        `https://upskilling-egypt.com:443/api/v1/userRecipe/`,{'recipeId' : recipeId},
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      console.log(response);
      getrecipeList();
      handleCloseFav();
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  

  return (
    <>
      <Header
        title={`Recipes Items`}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        headerBg={usersListImg}
      />

      <div className=" d-flex justify-content-between align-items-center m-3 p-3">
        <div className="">
          <h4>Recipes Table Details</h4>
          <p className="text-muted">You can check all details</p>
        </div>

        <div>
          <button
            className="btn btn-success"
            onClick={() => {
              localStorage.setItem("recipeId", JSON.stringify(""));
              localStorage.setItem("name", JSON.stringify(""));
              localStorage.setItem("description", JSON.stringify(""));
              localStorage.setItem("price", JSON.stringify(""));
              localStorage.setItem("imagePath", JSON.stringify(""));
              localStorage.setItem("categoriesIds", JSON.stringify(""));
              // navigateToRecipesData();
              handleAddClick();
            }}
          >
            Add New Item
          </button>
        </div>
      </div>

      <div className="row px-4 py-2">
        <div className="col-md-6">
          <input type="text" className="form-control" onChange={getNameValue} />
        </div>

        <div className="col-md-3">
          <select className="form-control" onChange={getCatIdValue}>
            <option value="">Search By Category</option>
            {categorisList?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select className="form-control" onChange={getTagIdValue}>
            <option value="">Search By Tag</option>
            {tagsList?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container my-3 px-4">
        {recipeLists.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {recipeLists.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>{recipe.id}</td>
                    <td scope="row">{recipe.name}</td>
                    <td>
                      {recipe.imagePath ? (
                        <img
                          className="w-25"
                          src={`${baseUrlImg}${recipe.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img src={noData} className="w-25" />
                      )}
                    </td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.category[0]?.name}</td>
                    <td>
                      {adminData?.userGroup == "SystemUser" ? ( <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleShowFav();
                          console.log(recipe.id);
                          setrcipeId(recipe.id)
                        }}
                      >
                        <i className="fa-solid fa-heart"></i>
                      </button>) : <>
                      
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          localStorage.setItem(
                            "recipeId",
                            JSON.stringify(recipe.id)
                          );
                          localStorage.setItem(
                            "name",
                            JSON.stringify(recipe.name)
                          );
                          localStorage.setItem(
                            "description",
                            JSON.stringify(recipe.description)
                          );
                          localStorage.setItem(
                            "price",
                            JSON.stringify(recipe.price)
                          );
                          localStorage.setItem(
                            "imagePath",
                            JSON.stringify(recipe.imagePath)
                          );
                          localStorage.setItem(
                            "tagId",
                            +JSON.stringify(recipe.tagId.id)
                          );
                          localStorage.setItem(
                            "categoriesIds",
                            +JSON.stringify(recipe.category[0]?.id)
                          );
                          console.log(recipe.id);
                          // navigateToRecipesData(rcipeId);
                          handleUpdateClick();
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                        
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleShow();
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      </>}
                    
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
                    <li key={page} className="page-item" onClick={() => getrecipeList(page , 5)}>
                    <a className="page-link">
                      {page}
                    </a>
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

      <Modal show={show} onHide={handleClose}>
        <div className="p-3">
          <div className="d-flex justify-content-end align-items-center">
            <i
              className="fa-regular fa-circle-xmark text-danger fa-lg"
              role="button"
              onHide={handleClose}
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
                    deleteRecipesById(rcipeId);
                  }}
                >
                  Delete this item
                </button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>

      <Modal show={showFav} onHide={handleCloseFav}>
        <div className="p-3">
          <div className="d-flex justify-content-end align-items-center">
            <i
              className="fa-regular fa-circle-xmark text-danger fa-lg"
              role="button"
              onHide={handleCloseFav}
            ></i>
          </div>
          <Modal.Body>
            <div className="text-center">
              <img src={noData} alt="" />
              <h2 className="my-3">Favourite this Recipe</h2>
              <p className="my-3">
                are you sure you want to add this item? if you are sure just{" "}
                <br /> click on Favourite it
              </p>
              <div className="text-end">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    AddRecipesByIdToFav(rcipeId);
                  }}
                >
                  Favourite this item
                </button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
