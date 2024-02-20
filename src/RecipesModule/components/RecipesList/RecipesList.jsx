import React from "react";
import Header from "../../../SharedModule/components/Header/Header";
import usersListImg from "../../../assets/images/usersListImg.png";

export default function RecipesList({ adminData }) {
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
          <h4>Users Table Details</h4>
          <p className="text-muted">You can check all details</p>
        </div>

        <div>
          <button className="btn btn-success">Add New Item</button>
        </div>
      </div>
    </>
  );
}
