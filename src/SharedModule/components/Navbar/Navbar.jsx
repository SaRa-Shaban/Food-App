import React from "react";

export default function Navbar({ adminData }) {
  console.log(adminData);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex w-75" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search here"
                aria-label="Search"
              />
            </form>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  {adminData?.userName}
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                <i className="fa-solid fa-chevron-down"></i>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa fa-bell"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
