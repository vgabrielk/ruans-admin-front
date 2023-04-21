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
  MDBInput,
  MDBInputGroup,
} from "mdb-react-ui-kit";

import React, { Fragment, useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

type userProps = {
  id: number;
  username: string;
  email: string;
  img: string;
};

const Users = () => {
  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async (link: string) => {
    setLoading(true);
    try {
      const response = await api.get(link);
      console.log(response.data.users);
      setData(response.data.users.data);
      setLinks(response.data.users.links);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const cursorPaginator = (item : string) => {
    switch(item) {
      case '&laquo; Previous' : 
      return '🡸'
      break
      case 'Next &raquo;' : 
      return '🡺'
      break
      default :
      return item
    }
  }

  useEffect(() => {
    getData("/users");
  }, []);
  return (
    <MDBContainer className=" mt-5" style={{ overflowY: "scroll" }}>
      <Link to="/admin/dashboard/store">
        <MDBBtn>Cadastrar novo usuário</MDBBtn>
      </Link>
      <MDBInputGroup className="mt-3 w-100">
        <MDBInput
          onChange={(e) => {
            getData(`/users?searchUsername=${e.target.value}`);
          }}
          label="Pesquisa por nome de usuário"
        />
        <MDBBtn rippleColor="dark">
          <MDBIcon icon="search" />
        </MDBBtn>
      </MDBInputGroup>
      {loading ? (
        <Loading />
        ) : (
          <div className="table-responsive">
          {!data.length ? (
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
                  {data.map((item: userProps) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{item.username}</p>
                            <p className="text-muted mb-0">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <MDBBadge color="success" pill>
                          Active
                        </MDBBadge>
                      </td>
                      <td>
                        <MDBBtn color="link" rounded size="sm">
                          <Link to={`/admin/dashboard/${item.id}`}>DETALHES</Link>
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </Fragment>
            </MDBTable>
          )}
        </div>
      )}
      {!data.length ? null : (
        <nav aria-label="...">
          <MDBPagination circle className="mb-0">
            {links.map((item: any) => (
              <MDBPaginationItem key={item.label} active={item.active}>
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
      )}
    </MDBContainer>
  );
};

export default Users;
