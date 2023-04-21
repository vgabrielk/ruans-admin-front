import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center mt-5 w-100">
      <MDBSpinner size="lg" />
    </div>
  );
};

export default Loading;
