import React, { useEffect, useState } from "react";
import {Row, Table} from "antd";
import Column from  "antd/lib/table/Column";
import { io } from "../../../api/io";
import AddEditSubGenresComponent from "./AddEditSubGenresComponent";

function SubGenresComponent() {
   const [subGenreData, setSubGenreData] = useState([]);
   const [loading, setLoading] =useState(false);

   useEffect(() => {
     getData();
   }, []);
   const getData = () => {
     io({ method: "get", url: "/api/subgenre" })
     .then(({data = [] } ={}) => {
       setSubGenreData(data.resultsMap.result);
       setLoading(false);
     })
     .catch((error) => {
       console.log(error);
     })
   }
  
 
 return(
  <>
    <Row style={{ justifyContent: "space-between" }}>
    <h2>Sub Genres</h2>
    <AddEditSubGenresComponent  getData={getData} isAdd={true} />
      </Row>
        <Table
        dataSource={subGenreData}
        loading={loading}
        size="small"
        rowKey="id"
        >
        <Column title ="Id" dataIndex="id" key="id" />
        <Column title="Genre" dataIndex="name" key="name" />
        <Column title="Active" dataIndex="active" key="active" />
        <Column title="ModifiedBy" dataIndex="modifiedBy" key="modifiedby" />
        <Column 
              title="Action"
              key="action"
              align="center"
              render={(text,record) => (
                 <AddEditSubGenresComponent
                   initialData ={record}
                   isAdd={false}
                   getData={getData}
                /> 
              )}
            /> 
    </Table>
  </>
 );
}
export default SubGenresComponent;