import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import RecipeContextProvider from './Context/RecipeStore.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecipeContextProvider>
      <App />
    </RecipeContextProvider>
  </React.StrictMode>
);
