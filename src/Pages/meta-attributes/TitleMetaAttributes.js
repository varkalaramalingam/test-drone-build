import React, { useState, useEffect } from "react";
import { Button, message, Row, Space, Table } from "antd";
import { io } from "../../api/io";
import AddEditTitleMetaAttributes from "./AddEditTitleMetaAttributes";
import Column from "antd/lib/table/Column";
import { DeleteOutlined} from '@ant-design/icons';


function TitleMetaAttributes() {
  const [attributeData, setAttributeData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMetaAttributeData();
  }, []);

  const getMetaAttributeData = () => {
    io({ method: "get", url: "/api/mastermeta/attributes" })
      .then(({ data = [] } = {}) => {
        setAttributeData(data.resultsMap.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteTitleMetaAttributeOnClick = (rowId) =>{
    deleteTitleMetaAttribute(rowId);
}

const deleteTitleMetaAttribute = (id) => {
   io({method: "delete" , url:`/api/mastermeta/attributes/${id}`})
   .then(({data= [] } ={}) => {
     message.success("TitleMetaAttribute is Inactive");
     getMetaAttributeData();
     setLoading(false);
   })
   .catch((error) => {
     console.log(error);
   }) 
}


  return (
    <>
    <Row style={{ justifyContent: "space-between" }}>
      <h2>Meta Attributes</h2>
      <AddEditTitleMetaAttributes getMetaAttributeData={getMetaAttributeData} isAdd={true} />
      </Row>
      <Table
        dataSource={attributeData}
        style={{ paddingBottom: "20px" }}
        loading={loading}
        size="small"
        bordered
        rowKey={"id"}
      >
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Attribute Value" dataIndex="dataValue" key="dataValue" />
        <Column title="Data Type" dataIndex="dataType" key="dataType" />
        <Column title="Active" dataIndex="active" key="active" />
        <Column title="Action"
          dataIndex="action"
          key="action"
          align="center"
          render={(text, record) => (
            <Space size="middle">
              <Button  type= "link" onClick={() => deleteTitleMetaAttributeOnClick(record.id)}
               disabled={(record.active ===0) ? true: false}
               to={{
                 state: {isAdd: false, record: record},
               }}>Delete</Button>
            <AddEditTitleMetaAttributes
              initialData={record}
              getMetaAttributeData={getMetaAttributeData}
              isAdd={false}
              />
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default TitleMetaAttributes;



