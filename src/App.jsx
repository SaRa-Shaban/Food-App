import { useState , useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter, json } from "react-router-dom";
import AuthLayout from "./SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./SharedModule/components/MasterLayout/MasterLayout";
import Login from "./AuthModule/components/Login/Login";
import ForgotPass from "./AuthModule/components/ForgotPass/ForgotPass";
import RecipesList from "./RecipesModule/components/RecipesList/RecipesList";
import UsersList from "./UsersModule/components/UsersList/UsersList";
import CategoriesList from "./CategoriesModule/components/CategoriesList/CategoriesList";
import NotFound from "./SharedModule/components/NotFound/NotFound";
import Home from "./HomeModule/components/Home/Home";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./SharedModule/components/ProtectedRoute/ProtectedRoute";
import ResetPass from "./AuthModule/components/ResetPass/ResetPass";
import RecipesData from "./RecipesModule/components/RecipesData/RecipesData";
import Register from "./AuthModule/components/Register/Register";
import VerifyUserAccount from "./AuthModule/components/VerifyUserAccount/VerifyUserAccount";
import FavouriteList from "./FavouriteModule/components/FavouriteList/FavouriteList";
import UpdateRecipe from "./RecipesModule/components/UpdateRecipe/UpdateRecipe";

function App() {
  // adminData is LoginData
  const [adminData, setadminData] = useState(null);

  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    // console.log(decodedToken);
    localStorage.setItem('adminData' , JSON.stringify(decodedToken))
    setadminData(decodedToken);
  };

  // to handle refresh navbar is null 
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);

  const routes = createBrowserRouter([
 

    {
      path: "dashboard",
      element: <ProtectedRoute adminData={adminData} > <MasterLayout adminData= {adminData}/></ProtectedRoute>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home adminData={adminData} /> },
        { path: "recipes", element: <RecipesList adminData={adminData} /> },
        { path: "recipes-data", element: <RecipesData /> },
        { path: "update-recipe", element: <UpdateRecipe /> },
        { path: "users", element: <UsersList /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "favourite", element: <FavouriteList /> },


      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "forgot-pass", element: <ForgotPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "register", element: <Register /> },
        { path: "verification", element: <VerifyUserAccount /> },

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
