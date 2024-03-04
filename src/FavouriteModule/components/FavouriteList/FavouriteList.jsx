import React, { useState, useEffect } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import usersListImg from "../../../assets/images/usersListImg.png";
import axios from "axios";
import noData from "../../../assets/images/no-data.png";
import Modal from "react-bootstrap/Modal";

export default function FavouriteList() {
  const [favouriteList, setfavouriteList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [recipeId, setRecipeId] = useState(0)

  const getFavouriteList = async () => {
    // console.log(data);
    let token = localStorage.getItem("adminToken");

    try {
      let favouriteList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );

      setfavouriteList(favouriteList.data.data);
      console.log(favouriteList.data.data);
    } catch (error) {
      console.log(error.response);
      // toast.error(error.response.data.message);
    }
  };

  const removeFromFav = async (id) => {
    console.log(id);
    let token = localStorage.getItem("adminToken");

    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/userRecipe/${id}`,
        {
          headers: {
            Authorization: token, // "Authorization" should be spelled correctly
          },
        }
      );
      console.log(response);
      getFavouriteList();
      handleClose();
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getFavouriteList();
  }, []);

  return (
    <>
      <Header
        title={`Favourie Items`}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        headerBg={usersListImg}
      />

      <div className="row p-4">
        {favouriteList?.length > 0 ? (
          favouriteList?.map((fav) => (
            <div className="col-md-4" key={fav.id}>
              <div className="item">
                <div className="card">
                  <div className="position-relative">
                    <i
                      className="fa fa-heart position-absolute end-0 p-3 text-danger fa-xl"
                      onClick={() => {
                        handleShow();
                        // removeFromFav(fav.id)
                        console.log(fav.id);
                        setRecipeId(fav.id)
                      }}
                    ></i>
                    <div>
                      {fav.recipe.imagePath ? (
                        <img
                          className="w-100 card-img-top"
                          src={`https://upskilling-egypt.com/${fav.recipe.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img
                          src={noData}
                          className="img-fluid rounded-5 card-img-top"
                        />
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <h3>{fav?.recipe?.name}</h3>
                    <p>{fav?.recipe?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <img src={noData} alt="" />
            <h4 className="my-3">No Data !</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
              Natus, est neque?
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
              onClick={handleClose}
            ></i>
          </div>
          <Modal.Body>
            <div className="px-4 text-center">
            <img src={noData} className="" alt="" />

              <p className="pt-4">
                are you sure to remove this recipe from favourite <br /> if you
                are sure click on remove buttons
              </p>
              <div className="text-end pt-4">
                <button className="btn btn-danger" onClick={() => {
                    removeFromFav(recipeId)
                }}> remove this Recipe</button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
