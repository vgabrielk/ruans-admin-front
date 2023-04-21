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
import { EnsaiosStore, CategoryEnsaios } from "../Store";
import SubEnsaiosDetails from "../../SubEnsaios/SubEnsaiosDetails";
import { SubEnsaios, SubEnsaiosStore } from "../../SubEnsaios/Store";

interface ensaioProps {
  id: number;
  title: string;
  img: string;
  subensaios?: any;
}

const EnsaioDetails = () => {
  const params = useParams();
  const [ensaio, setEnsaio] = useState<ensaioProps | any>({});
  const [loading, setLoading] = useState(false);
  const [basicActive, setBasicActive] = useState("tab1");
  console.log(ensaio);
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await api.delete(`/ensaios/${id}`);
      console.log(response);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = `/admin/ensaios/${params.id}`;
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getEnsaios = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/ensaios/${params.id}`);
      console.log(response);
      setEnsaio(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao carregar dados da categoria");
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnsaios();
  }, []);

  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
      <BackTo url={`/admin/category/${ensaio?.categoria_id}`} />
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
            Imagens
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
          >
            Cadastrar imagens
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}>
          <h5 className="py-3">Ensaio : {ensaio.title} </h5>
          <h5 className="py-3">Categoria : {ensaio?.categoria?.title} </h5>
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
                  src={`http://localhost:8000/img/ensaios/${ensaio.img}`}
                />
              )}
            </MDBCardBody>
            <MDBBtn onClick={() => deleteCategory(ensaio.id)}>
              Clique aqui para deletar ensaio
            </MDBBtn>
          </MDBCard>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <SubEnsaios data={ensaio.subensaio} />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}>
          <MDBCard className="mt-5">
            <SubEnsaiosStore />
          </MDBCard>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default EnsaioDetails;
