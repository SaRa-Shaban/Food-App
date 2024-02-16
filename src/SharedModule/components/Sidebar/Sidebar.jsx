import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import toggler from "./../../../assets/images/toggler.png";

export default function SideBar() {
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
              icon={<i className="fa fa-users" aria-hidden="true"></i>}
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              {" "}
              Recipes
            </MenuItem>
            <MenuItem icon={<i className="fa fa-home" aria-hidden="true"></i>}>
              {" "}
              Change Password
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              onClick={logOut}
            >
              {" "}
              LogOut
            </MenuItem>
          </Menu>
        </Sidebar>

        {/* <button className="btn btn-danger" onClick={logOut}>
        Logout
      </button> */}
      </div>
    </>
  );
}
