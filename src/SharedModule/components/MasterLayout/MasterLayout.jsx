import React from "react";
import { Outlet } from "react-router-dom";
import  Navbar from "./../Navbar/Navbar";
import Sidebar from '../Sidebar/Sidebar'
import Header from "../Header/Header";

export default function MasterLayout({adminData}) {
  return (
    <>
      <div>
        <div className="d-flex">
          <div>
            <Sidebar />
          </div>
          <div className="w-100">
            <Navbar adminData={adminData}/>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
