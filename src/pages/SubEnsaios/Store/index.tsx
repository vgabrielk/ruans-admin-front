import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React, { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../../services/api";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";

interface categoryProps {
  data: string[];

}


export const SubEnsaios = (props: categoryProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      {loading && <Loading size="lg" />}

      <div className="table-responsive">
        {!props?.data?.length ? (
          <MDBBadge className="mt-5">
            Não encontramos resultados para a pesquisa!
          </MDBBadge>
        ) : (
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <Fragment>
              <MDBTableBody>
                {props.data.map((item: any) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={`http://localhost:8000/img/subensaios/${item.img}`}
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{item.title}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <MDBBadge color="success" pill>
                        Active
                      </MDBBadge>
                    </td>
                    <td>
                      <Link
                        style={{ fontSize: "13px" }}
                        to={`/admin/subensaios/${item.id}`}
                      >
                        DETALHES
                      </Link>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </Fragment>
          </MDBTable>
        )}
      </div>
    </Fragment>
  );
};

export const SubEnsaiosStore = () => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  const createSubEnsaio = async (e: any) => {
    e.preventDefault();
    const payload = {
      ensaio_id: params.id,
      title: title,
      img: img,
    };
    try {
      const response = await api.post(`/subensaios`, payload);
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
  return (
    <Fragment>
      <form className="form" onSubmit={createSubEnsaio}>
        <MDBRow>
          <MDBCardTitle className="fs-5">
            A imagem será atrelada ao ensaio atual
          </MDBCardTitle>
          <MDBCol md="6">
            <MDBInput
              required
              label="Nome da imagem"
              onChange={(e) => setTitle(e.target.value)}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              required
              type="file"
              onChange={(e: any) => setImg(e.target.files[0])}
            />
          </MDBCol>
        </MDBRow>
        <MDBBtn className="mt-4" type="submit">
          Cadastrar
        </MDBBtn>
      </form>
    </Fragment>
  );
};
