import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBModalTitle,
} from "mdb-react-ui-kit";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api";
import BackTo from "../../../components/BackTo";
import Loading from "../../../components/Loading";


const CategoryStore = () => {
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [loadingButton, setLoadingButton] = useState(false)
  
  const navigate = useNavigate()

  const saveUpdates = async (e: any) => {
    e.preventDefault();
    setLoadingButton(true)
    const payload = new FormData();
    payload.append("title", title);
    payload.append("img", image);
    try {
      const response = await api.post("/categorias", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.type == "success") {
        toast.success("Cadastrado com sucesso!");
        setTimeout(() => {
          setLoadingButton(false)
         navigate('/admin/category')
        }, 1000);
      } else {
        toast.error("Erro ao cadastrar");
        setLoadingButton(false)
      }
    } catch (err) {
      console.log(err);
      setLoadingButton(false)
    }
  };

  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
       {loadingButton && <Loading size="lg" />}
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
          <MDBBtn  className="mb-4 d-flex align-items-center justify-content-center" type="submit">
            Cadastrar
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
};

export default CategoryStore;
