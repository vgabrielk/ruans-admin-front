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
  title: string

}


export const CategoryEnsaios = (props: categoryProps) => {
  const [loading, setLoading] = useState(false);
  console.log(props)
  return (
    <Fragment>
      <h3 className="ms-4 py-2 fs-5">Ensaios da categoria : {props.title}</h3>
      {loading ? (
        <div className="d-flex justify-content-center mt-5 w-100">
          <Loading />
        </div>
      ) : (
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
                            src={`http://localhost:8000/img/ensaios/${item.img}`}
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
                          to={`/admin/ensaios/${item.id}`}
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
      )}
    </Fragment>
  );
};

export const EnsaiosStore = ({ titlecategory }) => {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  const createEnsaio = async (e: any) => {
    e.preventDefault();
    const payload = {
      categoria_id: params.id,
      title: title,
      img: img,
    };
    try {
      const response = await api.post(`/ensaios`, payload);
      console.log(response);
      if (response.data.type == "success") {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = `/admin/category/${params.id}`;
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
      <form className="form" onSubmit={createEnsaio}>
        <MDBRow>
          <MDBCardTitle className="fs-5">
            O ensaio será atrelado a categoria : {titlecategory}
          </MDBCardTitle>
          <MDBCol md="6">
            <MDBInput
              className="mb-4"
              required
              label="Nome do ensaio"
              onChange={(e) => setTitle(e.target.value)}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              className="mb-4"
              required
              type="file"
              onChange={(e: any) => setImg(e.target.files[0])}
            />
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit">
          Cadastrar
        </MDBBtn>
      </form>
    </Fragment>
  );
};
