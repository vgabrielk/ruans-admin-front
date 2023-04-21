import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import { isLogged } from "./services/verifyToken";
import Categories from "./pages/Categories";
import CategoryStore from "./pages/Categories/Store";
import DashboardStore from "./pages/Users/Store";
import DashboardDetails from "./pages/Users/DashboardDetails";
import CategoryDetails from "./pages/Categories/CategoryDetails";
import Users from "./pages/Users";
import EnsaioDetails from "./pages/Ensaios/EnsaiosDetails";
import SubEnsaiosDetails from "./pages/SubEnsaios/SubEnsaiosDetails";

function PrivateRoute({ children }: any) {
  return isLogged() ? children : '';
}

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        {window.location.pathname.includes("/admin") && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard/:id"
            element={
              <PrivateRoute>
                <DashboardDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard/store"
            element={
              // <PrivateRoute>
              <DashboardStore />
              // </PrivateRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/category"
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/category/store"
            element={
              <PrivateRoute>
                <CategoryStore />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/category/:id"
            element={
              <PrivateRoute>
                <CategoryDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/ensaios/:id"
            element={
              <PrivateRoute>
                <EnsaioDetails />
              </PrivateRoute>
            }
          />
           <Route
            path="/admin/subensaios/:id"
            element={
              <PrivateRoute>
                <SubEnsaiosDetails />
              </PrivateRoute>
            }
          />
          {/* <Route path="*" element={<Notf />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
