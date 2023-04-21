import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import "/style.scss";
import { isLogged } from "./services/verifyToken";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
  </React.StrictMode>
);
