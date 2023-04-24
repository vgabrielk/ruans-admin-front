import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBIcon,
  MDBSpinner,
  MDBInputGroup,
  MDBInput,
} from "mdb-react-ui-kit";

import React, { Fragment, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { cursorPaginator } from "../../components/cursorpaginator";

type userProps = {
  id: number;
  title: string;
  img: string;
};

const Categories = () => {
  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async (link: string) => {
    setLoading(true);
    try {
      const response = await api.get(link);
      console.log(response);
      setData(response.data.category.data);
      setLinks(response.data.category.links);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  useEffect(() => {
    getData("/categorias");
  }, []);
  return (
    <MDBContainer className="mt-5" style={{ overflowY: "scroll" }}>
      <Link to="/admin/category/store">
        <MDBBtn>Cadastrar categoria</MDBBtn>
      </Link>

      {data.length ? (
        <MDBInputGroup className="mt-3 w-100">
          <MDBInput
            onChange={(e) => {
              getData(`/categorias?title=${e.target.value}`);
            }}
            label="Pesquisa por título"
          />
          <MDBBtn rippleColor="dark">
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>
      ) : null}
      {loading ? (
        <div className="d-flex justify-content-center mt-5 w-100">
          <Loading />
        </div>
      ) : (
        <div className="table-responsive">
          {!data.length ? (
            <MDBBadge className="mt-5">
              Nenhuma categoria disponível...
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
                  {data.map((item: userProps) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={`http://localhost:8000/img/categorias/${item.img}`}
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
                          to={`/admin/category/${item.id}`}
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
      {data.length ? (
        <nav aria-label="...">
          <MDBPagination circle className="mb-0">
            {links.map((item: any) => (
              <MDBPaginationItem active={item.active} key={item.label}>
                <MDBPaginationLink
                  href="#"
                  aria-disabled="true"
                  onClick={() => {
                    getData(item.url);
                  }}
                >
                  {cursorPaginator(item.label)}
                </MDBPaginationLink>
              </MDBPaginationItem>
            ))}
          </MDBPagination>
        </nav>
      ) : null}
    </MDBContainer>
  );
};

export default Categories;
