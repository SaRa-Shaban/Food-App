import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import toggler from "./../../../assets/images/toggler.png";
import ChangePass from "../../../AuthModule/components/ChangePass/ChangePass";
import Modal from "react-bootstrap/Modal";

export default function SideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isCollapsed, setisCollapsed] = useState(false);
  const toggleCollaapsed = () => {
    setisCollapsed(!isCollapsed);
  };

  const navigate = useNavigate();

  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <MenuItem
              className=" d-flex justify-content-center align-items-center"
              onClick={toggleCollaapsed}
              icon={<img src={toggler} className="mt-4" />}
            ></MenuItem>
            <MenuItem
              className="mt-4"
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={
                <i className="fa-solid fa-user-group" aria-hidden="true"></i>
              }
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users
            </MenuItem>
            <MenuItem
              icon={
                <i
                  className="fa-solid fa-table-cells-large"
                  aria-hidden="true"
                ></i>
              }
              component={<Link to="/dashboard/recipes" />}
            >
              {" "}
              Recipes
            </MenuItem>
            <MenuItem
              icon={
                <i
                  className="fa-regular fa-calendar-days"
                  aria-hidden="true"
                ></i>
              }
              component={<Link to="/dashboard/categories" />}
            >
              {" "}
              Categories
            </MenuItem>
            <MenuItem
              onClick={handleShow}
              icon={<i className="fa fa-unlock" aria-hidden="true"></i>}
            >
              {" "}
              Change Password
            </MenuItem>
            <MenuItem
              icon={
                <i
                  className="fa-solid fa-right-from-bracket"
                  aria-hidden="true"
                ></i>
              }
              onClick={logOut}
            >
              {" "}
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* modal */}

      <Modal show={show} onHide={handleClose}>
        <div className="">
          <Modal.Body>
            <ChangePass />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
