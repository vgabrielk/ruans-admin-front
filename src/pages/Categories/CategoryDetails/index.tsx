import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardImage,
  MDBBadge,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import BackTo from "../../../components/BackTo";
import Loading from "../../../components/Loading";
import { EnsaiosStore, CategoryEnsaios } from "../../Ensaios/Store";

interface categoryProps {
  id: number;
  title: string;
  img: string;
  ensaios?: any;
}

const CategoryDetails = () => {
  const params = useParams();
  const [category, setCategory] = useState<categoryProps | any>({});
  const [title, setTitle] = useState(category.title);
  const [image, setImage] = useState(category.img);

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [basicActive, setBasicActive] = useState("tab1");
  console.log(category);
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await api.delete(`/categorias/${id}`);
      console.log(response);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/admin/category";
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getCategory = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/categorias/${params.id}`);
      console.log(response);
      setCategory(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao carregar dados da categoria");
      setLoading(false);
    }
  };

  const saveUpdates = async (e: any) => {
    e.preventDefault();
    const payload = {
      title: title || category.title,
      img: image || category.img
    }
    setLoadingButton(true)
    try {
      const response = await api.post(`/categorias/${params.id}`, payload)
      console.log(response.data.message);
      console.log(response);
      if (response.data.type == "success") {
        toast.success("Cadastrado com sucesso!");
        setLoadingButton(false)
        getCategory()
      } else {
        console.log(response?.data);
        setLoadingButton(false)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
      <BackTo url="/admin/category" />
      <MDBTabs className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Detalhes
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Ensaios
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
          >
            Cadastrar ensaio
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}>
          <div className="row">
            <div className="col-md-6">
              <h3 className="my-4">Editar categoria</h3>
              <form onSubmit={saveUpdates}>

                <MDBInput
                  className="col-md-6 mb-3"
                  type="text"
                  label={'Título'}
                  value={title?.length >= 0 ? title : category.title}
                  onChange={(e: any) => setTitle(e.target.value)}
                />
                <MDBInput
                  className="mb-2 col-md-6"
                  type="file"
                  onChange={(e: any) => setImage(e.target.files[0])}
                />
                <MDBBtn style={{ width: '180px', height: '34px' }} className="mb-4 d-flex align-items-center justify-content-center" type="submit">
                  {loadingButton ? <Loading /> : 'Enviar'}
                </MDBBtn>
              </form>
            </div>
            <div className="col-md-6">
              <MDBCard>
                <MDBCardBody
                  className="border rounded d-flex justiy-content-center"
                  style={{ height: "300px" }}
                >
                  {loading ? (
                    <div className="d-flex justify-content-center mt-5 w-100">
                      <Loading />
                    </div>
                  ) : (
                    <img
                      className="img-center-details"
                      width={"100%"}
                      src={`http://localhost:8000/img/categorias/${category.img}`}
                    />

                  )}

                </MDBCardBody>
                <MDBBtn onClick={() => deleteCategory(category.id)}>
                  Clique aqui para deletar categoria
                </MDBBtn>
              </MDBCard>
            </div>
          </div>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <CategoryEnsaios data={category.ensaios} title={category.title} />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}>
          <MDBCard className="mt-5">
            <EnsaiosStore titlecategory={category.title} />
          </MDBCard>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer >
  );
};

export default CategoryDetails;
