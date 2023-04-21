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
import { CategoryEnsaios, EnsaiosStore } from "../../Store/../Ensaios/Store";

interface ensaioProps {
  id: number;
  title: string;
  img: string;
  subensaios?: any;
}

const SubEnsaiosDetails = () => {
  const params = useParams();
  const [subEnsaio, setSubEnsaio] = useState<ensaioProps | any>({});
  const [loading, setLoading] = useState(false);
  const [basicActive, setBasicActive] = useState("tab1");
  console.log(subEnsaio);
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const deleteCategory = async (id: number) => {
    try {
      const response = await api.delete(`/subensaios/${id}`);
      console.log(response);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = `/admin/subensaios/${params.id}`;
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getSubEnsaios = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/subensaios/${params.id}`);
      console.log(response);
      setSubEnsaio(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Erro ao carregar dados da categoria");
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubEnsaios();
  }, []);

  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
      <BackTo url={`/admin/ensaios/${subEnsaio?.ensaio_id}`} />
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
            Editar
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}>
          <h5 className="py-3">Título : {subEnsaio.title} </h5>
          <h5 className="py-3">Ensaio : {subEnsaio.ensaio?.title} </h5>
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
                  src={`http://localhost:8000/img/subensaios/${subEnsaio.img}`}
                />
              )}
            </MDBCardBody>
            <MDBBtn onClick={() => deleteCategory(subEnsaio.id)}>
              Clique aqui para deletar sub ensaio
            </MDBBtn>
          </MDBCard>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <MDBCard className="mt-5">
          </MDBCard>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default SubEnsaiosDetails;
