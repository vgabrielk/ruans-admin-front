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
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import BackTo from "../../../components/BackTo";
import Loading from "../../../components/Loading";

interface userProps {
  id: number;
  username: string;
  email: string;
  img: string;
  cpf: string;
}

const DashboardDetails = () => {
  const params = useParams();
  const [user, setUser] = useState<userProps>({});
  const [loading, setLoading] = useState(false);

  const [basicActive, setBasicActive] = useState("tab1");
  console.log(user);
  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 100);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getUser = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/users/${params.id}`);
      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      toast.error("Erro ao carregar dados da categoria");
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
      <BackTo url="/admin/dashboard" />
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
            Deletar
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem></MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}>
          <MDBCard className="col-md-6 border rounded" style={{height: '300px'}}>
            {loading ? (
              <Loading />
            ) : (
              <MDBCardBody>
                <MDBCardText>Usuário : {user.username}</MDBCardText>
                <MDBCardText>E-mail : {user.email}</MDBCardText>
                <MDBCardText>CPF : {user.cpf}</MDBCardText>
              </MDBCardBody>
            )}
          </MDBCard>
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>
          <MDBCard className="col-md-4 mt-5">
            <MDBBtn onClick={() => deleteUser(user.id)}>
              Clique aqui para deletar usuário
            </MDBBtn>
          </MDBCard>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default DashboardDetails;
