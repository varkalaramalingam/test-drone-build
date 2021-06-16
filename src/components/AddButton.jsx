import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function AddButton(props) {
  return (
    <>
      <Button type="primary" style={{ float: "right", marginBottom: "10px" }}>
        <Link to={{ pathname: `${props.path}`, state: { isAdd: props.isAdd, record: props.record } }}>
          {props.addPage}
        </Link>
      </Button>
      <h2>{props.pageName}</h2>
    </>
  );
}

export default AddButton;
