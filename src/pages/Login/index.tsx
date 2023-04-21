import { useState } from "react";

import {
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBSpinner,
} from "mdb-react-ui-kit";
import api from "../../services/api";
import { toast } from "react-hot-toast";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const payload = {
      username: username,
      password: password,
    };
    try {
      const response = await api.post(
        "/login",
        payload
      );
      console.log(response.data.user);
      if (response.data.type == "success") {
        localStorage.setItem('token' , response.data.access_token)
        localStorage.setItem('user' , JSON.stringify(response.data.user))
        toast.success('Logado com sucesso!')
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        },1000)
      } else {
        alert(response.data.message);
        toast.error('Erro ao logar!')
      }
      setLoading(false);
    } catch (err) {
      toast.error('Erro ao logar!')
      setLoading(false);
    }
  };
  return (
    <form
      className="form d-flex justify-content-center"
      style={{ width: "100%" }}
      onSubmit={submit}
    >
      <MDBContainer
        className="p-3 my-5 d-flex justify-content-center flex-column form-login-data"
      >
        <img
          className="mb-4 rounded-circle mx-auto"
          width="80px"
          src="https://yt3.googleusercontent.com/sJWj_ZDCSgwH-pE8FtknR1yEviovsxGvRjdYoQ30krzzq283lQkb__XVS1ZG02DaT9pDtECg=s176-c-k-c0x00ffffff-no-rj"
          alt=""
        />
        <MDBInput
          required
          wrapperClass="mb-4"
          label="Nome de usuário"
          id="form1"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
        <MDBInput
          required
          wrapperClass="mb-4"
          label="Senha"
          id="form2"
          minLength={8}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <MDBBtn
          style={{ height: "45px" }}
          className="mb-4 d-flex align-items-center justify-content-center"
        >
          Entrar
          {loading && (
            <MDBSpinner size="sm" className="ms-3">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          )}
        </MDBBtn>
      </MDBContainer>
    </form>
  );
};

export default Login;
