import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../SharedModule/components/Header/Header";
import homeImg from "../../../assets/images/homeImg.png";
import { useNavigate } from "react-router-dom";
import HeaderRecipe from "../../../SharedModule/components/HeaderRecipe/HeaderRecipe";

export default function Home({ adminData }) {
  return (
    <>
      <ToastContainer />
      <Header
        title={`Welcome ${adminData?.userName}`}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        headerBg={homeImg}
      />

     <HeaderRecipe/>
    </>
  );
}
