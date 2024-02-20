import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../SharedModule/components/Header/Header";
import homeImg from '../../../assets/images/homeImg.png'

export default function Home({adminData}) {
  return (
    <>
      <ToastContainer />
      <Header title={`Welcome ${adminData?.userName}`} description={"This is a welcoming screen for the entry of the application , you can now see the options"} headerBg={homeImg}/>

      <div className="bg-light m-4 rounded-3">
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-md-5 d-flex align-items-center">
            <div className="p-4">
              <h2>Fill the <span className="text-success">Recipes </span>!</h2>
              <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
          </div>
          <div className="col-md-3  d-flex align-items-center">
            <div className="header-img text-center">
              <button className="btn btn-success px-5">Fill Recipes <i className="fa fa-arrow-right ps-3"></i></button>
            </div>
          </div>
        </div>
      </div>
      </div>

    </>
  );
}
