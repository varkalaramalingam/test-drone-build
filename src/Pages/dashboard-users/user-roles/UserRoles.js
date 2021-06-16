import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Column from "antd/lib/table/Column";
import AddEditRoles from "./AddEditRole";
import { io } from "../../../api/io";

function UserRoles({userId}) {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails()
  }, []);

  const getUserDetails = () => {
    io({ method: "get", url: `/api/user/${userId}/role` })
      .then(({ data: { resultsMap: { result = [] } } } = {}) => {
        setUsersData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      <h2 style={{ float: "left" }}>Users List</h2>
      <AddEditRoles isAdd={true}
        getUserDetails={getUserDetails}
        userId={userId}
      />
      <Table
        dataSource={usersData}
        rowKey="id"
        loading={loading}
        size="small"
        bordered
      >
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="UserId" dataIndex="userId" key="userId" />
        <Column title="User Name" dataIndex="fname" key="fname" />
        <Column title="RoleId" dataIndex="roleId" key="roleId" />
        <Column title="Role Name" dataIndex="role" key="role" />
        <Column title="TenantId" dataIndex="tenantId" key="tenantId" />
        <Column title="Tenant Name" dataIndex="tenantName" key="tenantName" />
        <Column title="Action"
          dataIndex="action"
          key="action"
          align="center"
          render={(text, record) => (
            <AddEditRoles
              getUserDetails={getUserDetails}
              editUserRecord={record}
              isAdd={false}
              userId={userId}
            />
          )}
        />
      </Table>
    </>
  );
}

export default UserRoles;
