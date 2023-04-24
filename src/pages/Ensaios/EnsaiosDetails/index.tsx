import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { SubEnsaios, SubEnsaiosStore } from "../../SubEnsaios/Store";

import api from "../../../services/api";
import BackTo from "../../../components/BackTo";
import Loading from "../../../components/Loading";
import Select from "react-select";

interface ensaioProps {
  id: number;
  title: string;
  img: string;
  subensaios?: any;
}

const EnsaioDetails = () => {
  const params = useParams();
  const [ensaio, setEnsaio] = useState<ensaioProps | any>({});
  const [categorias, setCategorias] = useState([]);

  const [title, setTitle] = useState(ensaio.title);
  const [image, setImage] = useState("");
  const [categoria_id, setCategoriaId] = useState({ value: null, label: '' })

  const [loading, setLoading] = useState(false);

  const [basicActive, setBasicActive] = useState("tab1");

  const navigate = useNavigate();

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };

  const deleteEnsaio = async (id: number) => {
    try {
      const response = await api.delete(`/ensaios/${id}`);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate(`/admin/category/${ensaio.categoria.id}`);
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Algo de errado aconteceu...")
    }
  };

  const getEnsaio = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/ensaios/${params.id}`);
      setEnsaio(response.data);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      toast.error("Erro ao carregar dados do ensaio");
      setLoading(false);
    }
  };

  const getCategorias = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/categorias`);
      setCategorias(response.data.categorySelect);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      toast.error("Erro ao carregar dados da categoria");
      setLoading(false);
    }
  };
  const updateEnsaio = async (e: any) => {
    e.preventDefault();
    const payload = new FormData
    payload.append("title", title || ensaio.title)
    payload.append("img", image || ensaio.img)
    payload.append("categoria_id", categoria_id.value || ensaio.categoria_id)
    try {
      setLoading(true)
      const response = await api.post(`/ensaios/${params.id}`, payload)
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setLoading(false)
        getEnsaio()
      } else {
        toast.error(response.data.message);
        setLoading(false)
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro ao tentar atualizar ensaio.")
    }
  };

  useEffect(() => {
    getEnsaio();
  }, []);

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
       {loading && <Loading size="lg" />}
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
      <MDBTabsContent style={{ height: '70vh' }}>
        <MDBTabsPane show={basicActive === "tab1"}>
          <div className="row">
            <div className="col-md-6">
              <h3 className="my-4">Editar ensaio</h3>
              <form onSubmit={updateEnsaio}>
                <MDBInput
                  className="col-md-6 mb-3"
                  type="text"
                  label={'Título'}
                  value={title?.length >= 0 ? title : ensaio.title}
                  onChange={(e: any) => setTitle(e.target.value)}
                />
                <MDBInput
                  className="mb-3 col-md-6"
                  type="file"
                  onChange={(e: any) => setImage(e.target.files[0])}

                />
                <label>Categoria</label>
                <Select
                  className="mb-3"
                  options={categorias.map((item: any) => ({
                    value: item.id,
                    label: item.title
                  }))}
                  placeholder={categoria_id?.value?.length >= 0 ? categoria_id?.label : ensaio?.categoria?.title}
                  onChange={(e: any) => setCategoriaId(e)}
                />
                <MDBBtn className="mb-4 d-flex align-items-center justify-content-center" type="submit">
                  Enviar
                </MDBBtn>
              </form>
            </div>
            <div className="col-md-6">
              <MDBCard>
                <MDBCardBody
                  className="border rounded d-flex justiy-content-center"
                  style={{ height: "300px" }}
                >
                  <img
                    className="img-center-details"
                    width={"100%"}
                    src={`http://localhost:8000/img/ensaios/${ensaio.img}`}

                  />
                </MDBCardBody>
                <MDBBtn
                  onClick={() => deleteEnsaio(ensaio.id)}
                  type="submit">
                  DELETAR ENSAIO
                </MDBBtn>
              </MDBCard>
            </div>
          </div>
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
