import {
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBSpinner,
} from "mdb-react-ui-kit";

import React, { Fragment, useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useLocation } from "react-router-dom";
import Loading from "../Loading";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const [menu, setMenu] = useState(true);
  const [loading, setLoading] = useState(false)
  const logout = async () => {
    const response = await api.get("/logout");

    if (response.status == 200) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };
  const userLS = JSON.parse(localStorage.getItem("user") || "{}");

  const getCurrentUser = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/users/${userLS.id}`);
      console.log(response.data.user.user);
      setUserName(response.data.user.username);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    setMenu(false)
  }, [location])

  return (
    <Fragment>
      <div className="menu-bars">
        <MDBIcon
          onClick={(e: any) => setMenu(!menu)}
          fas
          icon='bars'
        />
      </div>
      <MDBListGroup
        className={menu ? 'navbar-content active' : 'navbar-content'}
        light

      >
        <MDBRipple className="w-100">
          <MDBListGroupItem action noBorders className="px-3">
            <MDBIcon className="me-4" fas icon="user" />
            {loading ? (
              <Loading/>

            ) : userName}
          </MDBListGroupItem>
        </MDBRipple>
        <Link to="/admin/dashboard">
          <MDBRipple className="w-100">
            <MDBListGroupItem
              action
              noBorders
              active={location.pathname.includes("dashboard") && true}
              className="px-3"
            >
              <MDBIcon className="me-4" fas icon="home" />
              Usuários
            </MDBListGroupItem>
          </MDBRipple>
        </Link>

        <Link to="/admin/settings">
          <MDBRipple className="w-100">
            <MDBListGroupItem
              action
              noBorders
              active={location.pathname.includes("settings") && true}
              className="px-3"
            >
              <MDBIcon className="me-4" fas icon="cog" />
              Configurações
            </MDBListGroupItem>
          </MDBRipple>
        </Link>
        <Link to="/admin/category">
          <MDBRipple className="w-100">
            <MDBListGroupItem
              action
              noBorders
              active={location.pathname.includes("category") && true}
              className="px-3"
            >
              <MDBIcon className="me-4" fas icon="icons" />
              Categorias
            </MDBListGroupItem>
          </MDBRipple>
        </Link>
        <MDBRipple className="w-100">
          <MDBListGroupItem
            style={{ cursor: "pointer" }}
            action
            noBorders
            className="px-3"
            onClick={logout}
          >
            <MDBIcon className="me-4" fas icon="sign-out-alt" />
            Sair
          </MDBListGroupItem>
        </MDBRipple>
      </MDBListGroup>
    </Fragment>
  );
};

export default Navbar;
