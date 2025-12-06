

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import App from "./App";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <App />
          <ToastContainer position="top-right" autoClose={1500} pauseOnHover theme="light" />
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
