import React, { useEffect, useState } from "react";
import { Button, message, Row, Space, Table} from "antd";
import { io } from "../../api/io";
import AddEditRawCatalogue from "./AddEditRawCatalogue";
import Column from "antd/lib/table/Column";


function RawDataCatalogue() {
  const [userRolesData, setUserRolesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRawCatalogueData();
  }, []);

  const getRawCatalogueData = () => {
    io({ method: "get" , url: "/api/rawdataCatalog/active/1" })
    .then(({ data = [] } ={}) =>{
      setUserRolesData(data.resultsMap.result);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const deleteRecord = (record) => {
    io({
      method: "delete",
      url: `/api/rawdataCatalog/${record.id}`,
      data: { id: record.id },
    })
      .then((data) => {
        message.success("Deleted successfully");
        getRawCatalogueData();
  })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
      <>
        <Row style={{ justifyContent:"space-between" }}>
            <h2>Raw Data Catalogue</h2> 
            <Row span={12} gutter={10}>
            <Button type="primary" style={{marginRight:"10px"}}>Import Catalogue</Button>
            <AddEditRawCatalogue getRawCatalogueData={getRawCatalogueData} isAdd={true} />
            </Row>
        </Row>
        <Table
          dataSource={userRolesData}
          style={{paddingBottom: "20px"}}
          loading={loading}
          size="small"
          rowKey="id"
          scroll={{ x: 1300 }}
        >
         <Column title ="Id" dataIndex="id" key="id" width={50} />
         <Column title="Source" dataIndex="src" key="src" width={120} />
         <Column title="Url" dataIndex="url" key="url" width={460} />
         <Column title="Description" dataIndex="description" key="description" width={250} />
         <Column title="Run By" dataIndex="createdBy" key="createdBy  " width={100} />
         <Column title="Run Date" dataIndex="createdOn" key="createdOn" width={200} />
         <Column title="Active" dataIndex="active" key="action" width={100} />
         <Column title="Action"
                 dataIndex="action" 
                 width={250}
                 key="action"
                 fixed="right"
                 align="center"
                 render={(text,record) => {
                   let isCsv = record.url.split("?")[0].split("#")[0].split('.').pop() === "csv";
                   return (
                  <Space size="small">
                  <a href={isCsv ? record.url : false}  onClick={() =>{
                    isCsv ? message.success("CSV file Downloaded successfully") : message.error(`Requested url is not a CSV file`);  
                    }}>Download</a>
                  <Button type="link" style={{padding:0}} onClick={() => deleteRecord(record)}>Delete</Button>
                  <Button type="link" style={{padding:0}}>Process</Button>
                  <Button type="link" style={{padding:0}}>Validate</Button>
                 </Space>
                 )}}
              />
        </Table>
      </>
  );
} 

export default RawDataCatalogue;
