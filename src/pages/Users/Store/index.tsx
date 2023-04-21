import {
  MDBContainer,
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
  MDBSpinner,
  MDBModalTitle,
  MDBIcon,
} from "mdb-react-ui-kit";

import React, { Fragment, useEffect, useState } from "react";
import api from "../../../services/api";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import BackTo from "../../../components/BackTo";

type settingProps = {
  id: number;
  username: string;
  email: string;
  img: string;
  cpf: string;
};

const DashboardStore = () => {
  const userLS = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState({});

  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitUser = async (e: any) => {
    e.preventDefault();
    const payload = {
      username: userName,
      cpf: cpf,
      email: email,
      password: password,
      confirmpassword: confirmPassword,
    };
    console.log(payload);
    try {
      const response = await api.post("/registration", payload);
      console.log(response);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1000);
      } else {
        return toast.error("Erro ao enviar dados!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Algo de errado aconteceu ao tentar cadastrar!");
    }
  };

  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
      <BackTo url="/admin/dashboard" />
      <form onSubmit={submitUser} className="row g-3">
        <MDBModalTitle>Cadastrar novo usuário</MDBModalTitle>
        <div className="col-md-6">
          <MDBInput
            required
            label="Nome de usuário"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <MDBInput
            required
            label="Cpf"
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <MDBInput
            required
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
            <MDBInput
              required
              minLength={8}
              type="password"
              label="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="col-md-6">
          <MDBInput
            required
            type="password"
            minLength={8}
            label="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="col-12">
          <MDBBtn type="submit" onSubmit={submitUser}>
            Salvar
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
};

export default DashboardStore;
