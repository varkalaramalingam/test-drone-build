import React, { useEffect, useState } from "react";
import { Row, Table} from "antd";
import { io } from "../../api/io";
import AddEditUserRoles from "./AddEditUserRoles";
import Column from "antd/lib/table/Column";


function UserRolesComponent() {
  const [userRolesData, setUserRolesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getuserRolesData();
  }, []);
  const getuserRolesData = () => {
    io({ method: "get" , url: "/api/user" })
    .then(({ data = [] } ={}) =>{
      setUserRolesData(data.resultsMap.result);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
      <>
        <Row style={{ justifyContent: "space-between" }}>
        <h2>User Roles</h2>
        <AddEditUserRoles getuserRolesData={getuserRolesData} isAdd={true} />
        </Row>
        <Table
          dataSource={userRolesData}
          style={{paddingBottom: "20px"}}
          loading={loading}
          size="small"
          rowKey="id"
        >
         <Column title ="Id" dataIndex="id" key="id" />
         <Column title="Role" dataIndex="role" key="role" />
         <Column title="Description" dataIndex="description" key="description" />
         <Column title="Active" dataIndex="active" key="action" />
         <Column title="Action"
                 dataIndex="action" 
                 key="action"
                 align="center"
                 render={(text,record) => (
                   <AddEditUserRoles
                     getuserRolesData={getuserRolesData}
                     initialData={record}
                     isAdd={false}
                  />
                 )}
              />
        </Table>
      </>
  );
} 

export default UserRolesComponent;
