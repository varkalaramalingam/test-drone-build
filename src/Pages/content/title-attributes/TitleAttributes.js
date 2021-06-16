import React, { useEffect, useState } from "react";
import { Button, message, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { io } from "../../../api/io";
import AddEditTitleAttribute from "./AddEditTitleAttribute";

function TitleAttribute({ titleId }) {
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAttributeList();
  }, []);
  const getAttributeList = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/attributes?titleid=${titleId}` })
      .then(({ data = [] } = {}) => {
        setGenreData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  };

  const deleteRecord = (record) => {
    io({
      method: "delete",
      url: `/api/mastermeta/${titleId}/attributes?id=${record.id}`,
      data: record.id
    })
      .then((data) => {
        message.success("Deleted successfully");
        getAttributeList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

   return (
    <>
      <AddEditTitleAttribute isAdd={true} titleId={titleId} getAttributeList={getAttributeList} />
      <Table dataSource={genreData} loading={!loading} size="small" rowKey="id">
        <Column title="Id" dataIndex="id" key="id" align="center" width={100} />
        <Column title="Attribute Id" dataIndex="attributeId" key="attributeI" align="center" />
        <Column title="Attribute Name" dataIndex="name" key="name" align="center" />
        <Column title="Attribute Value" dataIndex="dataValue" key="dataValue" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <Space size="middle">
              <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>
              <AddEditTitleAttribute
                isAdd={false}
                initialData={record}
                titleId={titleId}
                getAttributeList={getAttributeList}
              />
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default TitleAttribute;
