import React from "react";
import notFound from "../../../assets/images/notFound.png";
import logo from '../../../assets/images/logo.png'

export default function NotFound() {
  return (
    <>
      <div className="not-found  vh-100">
        <div className="container">
          <img src={logo} alt="" />
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div className="content-notFound">
                <h2>Oops.... </h2>
                <h3 className="text-success">Page not found </h3>
                <p className="my-3">
                  This Page doesn’t exist or was removed! <br /> We suggest you back to
                  home.
                </p>
                <button className="btn btn-success w-75 mt-5">back to <br/> <i className="fa fa-arrow-left pe-2"></i> home </button>
              </div>
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <div className="img-notFound">
                <img src={notFound} className="w-100" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
