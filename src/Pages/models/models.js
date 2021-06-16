import React, { useEffect, useState } from "react";
import { Table, Space, Row, message } from "antd";
import GenerateModel from "./GenerateModel";
import { io } from "../../api/io";

function ModelsComponent() {
  const [modelsData, setModelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);;
    getModelsData();
  }, []);

  const getModelsData = () => {
    io({ method: "get", url: `/api/contelligenz/unified/model` })
      .then(({data}) => {
        setModelsData(data.resultsMap.data);
        // setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const columns = [
    {
      title: "Model ID",
      dataIndex: "id",
      align: "center",
      key: "id",
      width: 100
    },
    {
      title: "Run By",
      dataIndex: "generatedby",
      align: "center",
      key: "generatedby",
      width: 100
    },
    {
      title: "Model Name",
      dataIndex: "model_name",
      align: "center",
      key: "model_name",
      width: 200
    },
    {
      title: "Tenant Name",
      dataIndex: "tenant",
      align: "center",
      key: "tenant",
      width: 100
    },
    {
      title: "Run On",
      dataIndex: "date_generated",
      align: "center",
      key: "date_generated",
      width: 200
    },
    {
      title: "Data File",
      dataIndex: "fileurl",
      align: "center",
      key: "fileurl",
      width: 500
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "action",
      key: "action",
      fixed:"right",
      width: 80,
      render: (text, record) => (
        <Space size="small">
          <a type="link" href={record.fileurl} onClick={() => message.success(record.model_name + " Downloaded successfully")}>Download</a>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="modelsComponent">
        <Row style={{ justifyContent:"space-between" }}>
            <h2 style={{ float: "left" }}>Models</h2>
            <GenerateModel
              isAdd={true}
              btnType="primary"
              getModelsData={getModelsData}
            />
        </Row>
        <Table
          dataSource={modelsData}
          columns={columns}
          rowKey="id"
          loading={loading}
          size="small"
          scroll={{ x: 1300 }}
        />
      </div>
    </React.Fragment>
  );
}

export default ModelsComponent;
