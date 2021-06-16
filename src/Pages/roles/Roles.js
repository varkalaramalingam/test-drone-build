import { Row, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import AddEditRoles from "./AddEditRoles";
import { io } from "../../api/io";

function Roles() {
  const [peopleRolesData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getRolesData() }, []);

  const getRolesData = () => {
    io({ method: "get", url: "/api/role" })
      .then(({ data = [] } = {}) => {
        setRoleData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  return (
    <>
    <Row style={{ justifyContent: "space-between" }}>
      <h2>Roles</h2>
      <AddEditRoles btnType="primary" isAdd={true} getRolesData={getRolesData}/>
      </Row> 
      <Table
        dataSource={peopleRolesData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Role Name" dataIndex="rolename" key="rolename" align="center" />
        <Column title="Role Datails" dataIndex="roledetails" key="roledetails" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <AddEditRoles
              initialData={record}
              isAdd={false}
              btnType="primary"
              getRolesData={getRolesData}
            />
          )}
        />
      </Table>
    </>
  );
}

export default Roles;
