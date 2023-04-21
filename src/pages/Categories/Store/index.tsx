import {
  MDBContainer,
  MDBValidation,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
  MDBSpinner,
  MDBModalTitle,
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

const CategoryStore = () => {
  const userLS = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState({});

  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const { register, handleSubmit } = useForm();

  console.log(image);
  const saveUpdates = async (e: any) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("title", title);
    payload.append("img", image);
    try {
      const response = await api.post("/categorias", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      console.log(response);
      if (response.data.type == "success") {
        toast.success("Cadastrado com sucesso!");
        setTimeout(() => {
          window.location.href = "/admin/category";
        }, 1000);
      } else {
        toast.error("Erro ao cadastrar");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
      <BackTo url="/admin/category" />
      <form onSubmit={saveUpdates} className="row g-3">
        <MDBModalTitle>Cadastrar categoria</MDBModalTitle>
        <div className="col-md-6">
          <MDBInput
            required
            label="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <MDBInput
            onChange={(e: any) => setImage(e.target.files[0])}
            type="file"
            required
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

export default CategoryStore;
