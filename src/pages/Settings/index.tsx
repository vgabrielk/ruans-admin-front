import {
  MDBContainer,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
  MDBSpinner,
} from "mdb-react-ui-kit";

import React, { Fragment, useEffect, useState } from "react";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type settingProps = {
  id: number;
  username: string;
  email: string;
  img: string;
  cpf: string;
};

const Settings = () => {
  const userLS = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState({});

  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");

  const { register, handleSubmit } = useForm();

  const saveUpdates = async (e: any) => {
    e.preventDefault();

    const payload = {
      username: username,
      cpf: cpf,
      email: email,
      password: password,
    };
    try {
      const response = await api.post("/settings", payload);
      console.log(response.data.message);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await api.get(`/users/${userLS.id}`);
      console.log(response.data.user.user);
      setCpf(response.data.user.cpf);
      setEmail(response.data.user.email);
      setUsername(response.data.user.username);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <MDBContainer style={{ overflowY: "scroll" }}>
      {/*<Loading/>
          <MDBSpinner className="mt-5" size="lg" />
        </div> */}
      <form onSubmit={saveUpdates} className="row g-3 mt-5">
        <div className="col-md-6">
          <MDBInput
            required
            label="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <MDBInput
            disabled
            required
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <MDBInput
            label="Senha"
            type="text"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <MDBInput
            label="CPF"
            disabled
            type="text"
            className="form-control"
            value={cpf}
            required
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="col-12">
          <MDBBtn type="submit" onSubmit={saveUpdates}>
            Salvar
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
};

export default Settings;
