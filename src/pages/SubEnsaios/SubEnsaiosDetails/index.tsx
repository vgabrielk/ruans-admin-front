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
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import api from "../../../services/api";
import Select from 'react-select'
import BackTo from "../../../components/BackTo";
import Loading from "../../../components/Loading";

interface ensaioProps {
  id: number;
  title: string;
  img: string;
  subensaios?: any;
}

const SubEnsaiosDetails = () => {
  const params = useParams();
  const [subEnsaio, setSubEnsaio] = useState<ensaioProps | any>({});
  const [ensaios, setEnsaios] = useState([]);

  const [ensaio_id, setEnsaioId] = useState({value: null, label: ''})

  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const [title, setTitle] = useState(subEnsaio.title);
  const [image, setImage] = useState(subEnsaio.img);
  const [basicActive, setBasicActive] = useState("tab1");
  console.log(ensaios);
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

  const getEnsaios = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/ensaios`);
      setEnsaios(response.data.ensaiosSelect);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      toast.error("Erro ao carregar dados dos ensaios");
      setLoading(false);
    }
  };

  const saveUpdates = async (e: any) => {
    e.preventDefault();
    const payload = {
      title: title || subEnsaio.title,
      img: image || subEnsaio.img,
      ensaio_id: ensaio_id.value || subEnsaio.ensaio_id
    }
    setLoadingButton(true)
    try {
      const response = await api.post(`/subensaios/${params.id}`, payload)
      console.log(response.data.message);
      console.log(response);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setLoadingButton(false)
        getSubEnsaios()
      } else {
        console.log(response?.data);
        toast.error("Erro ao cadastrar")
        setLoadingButton(false)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSubEnsaios();
  }, []);

  useEffect(() => {
    getEnsaios();
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
      </MDBTabs>
      <MDBTabsContent style={{height: '70vh'}}>
        <MDBTabsPane show={basicActive === "tab1"}>
           <div className="row">
            <div className="col-md-6">
              <h3 className="my-4">Editar imagem</h3>
              <form onSubmit={saveUpdates}>

                <MDBInput
                  className="col-md-6 mb-3"
                  type="text"
                  label={'Título'}
                  value={title?.length >= 0 ? title : subEnsaio.title}
                  onChange={(e: any) => setTitle(e.target.value)}
                />
                <MDBInput
                  className="mb-2 col-md-6"
                  type="file"
                  onChange={(e: any) => setImage(e.target.files[0])}
                />
                <Select
                  className="my-3"
                  options={ensaios?.map((item: any) => ({
                    value: item.id,
                    label: item.title
                  }))}
                  placeholder={ensaio_id?.value?.length >= 0 ? ensaio_id?.label : subEnsaio?.ensaio?.title}
                  onChange={(e: any) => setEnsaioId(e)} 
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
                      src={`http://localhost:8000/img/subensaios/${subEnsaio.img}`}
                    />

                  )}

                </MDBCardBody>
                <MDBBtn onClick={() => deleteCategory(subEnsaio.id)}>
                  Clique aqui para deletar imagem
                </MDBBtn>
              </MDBCard>
            </div>
          </div>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default SubEnsaiosDetails;
