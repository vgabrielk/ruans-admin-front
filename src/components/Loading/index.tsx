import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

type Props = {
  size?: any
}
const Loading = ({size} : Props) => {
  return (
      <MDBSpinner grow size={size || 'sm'} />
  );
};

export default Loading;
