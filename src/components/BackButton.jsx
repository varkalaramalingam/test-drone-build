import { Button, Col, Row } from "antd";
import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function BackButton(props) {
  let history = useHistory();

  return (
    <>
      <Row>
        <Col span={12}>
          <h2>{props.pageName}</h2>
        </Col>
        <Col span={12}>
          <div style={{ paddingBottom: "20px" }}>
            <Button
              onClick={() => history.goBack()}
              icon={<LeftOutlined />}
              style={{ float: "right" }}
            >
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default BackButton;
