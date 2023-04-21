import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-router-dom";
type Props = {
  url: string;
};
const BackTo = (props: Props) => {
  return (
    <Link className="back-to" to={props.url}>
      <MDBIcon fas icon="long-arrow-alt-left p-2 fs-3" />
    </Link>
  );
};

export default BackTo;
