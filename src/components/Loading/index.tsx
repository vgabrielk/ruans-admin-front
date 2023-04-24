import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

type Props = {
  size?: any
}
const Loading = ({size} : Props) => {
  return (
    <div className="content-spinner">
      <MDBSpinner className="spinner" grow size={size || 'lg'} />
    </div>
  );
};

export default Loading;
