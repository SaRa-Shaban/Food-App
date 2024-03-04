import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderRecipe() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-light m-4 rounded-3">
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-md-5 d-flex align-items-center">
              <div className="p-4">
                <h2>
                  Fill the <span className="text-success">Recipes </span>!
                </h2>
                <p>
                  you can now fill the meals easily using the table and form ,
                  click here and sill it with the table !
                </p>
              </div>
            </div>
            <div className="col-md-3  d-flex align-items-center">
              <div className="header-img text-center">
                <button
                  className="btn btn-success px-5"
                  onClick={() => {
                    navigate("/dashboard/recipes");
                  }}
                >
                  Fill Recipes <i className="fa fa-arrow-right ps-3"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
