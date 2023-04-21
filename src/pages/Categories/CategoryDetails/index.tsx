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
  const [loading, setLoading] = useState(false);
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
          <h5 className="py-3">Categoria : {category.title} </h5>
          <MDBCard className="col-md-6">
            <MDBCardBody
              className="border rounded d-flex justiy-content-center"
              style={{ height: "300px" }}
            >
              {loading ? (
                <Loading />
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
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <CategoryEnsaios data={category.ensaios} title={category.title} />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}>
          <MDBCard className="mt-5">
            <EnsaiosStore titlecategory={category.title}/>
          </MDBCard>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default CategoryDetails;
