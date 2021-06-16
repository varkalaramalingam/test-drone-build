import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { io } from "../../api/io"
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";
import AddButton from "../../components/AddButton";

function UsersComponent() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails()
  }, []);

  const getUserDetails = () => {
    io({ method: "get", url: '/api/user/details' })
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
      <h2 style={{ float: "left" }}>Accounts</h2>
      <AddButton
        path="/dashboard-users/add-user"
        addPage="Add Account"
        isAdd={true}
      />
      <Table
        dataSource={usersData}
        rowKey="id"
        loading={loading}
        size="small"
        bordered
        scroll={{ x: 1000 }}
      >
        <Column title="Id" dataIndex="credentialsId" key="credentialsId" width={50} />
        <Column title="UserId" dataIndex="userDetailsId" key="userDetailsId" width={100}/>
        <Column title="User Name" dataIndex="fname" key="fname" />
        <Column title="Email" dataIndex="emailid" key="emailid" />
        <Column title="Contact Number" dataIndex="contactnumber" key="contactnumber" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="Action"
          dataIndex="action"
          key="action"
          align="center"
          fixed="right"
          render={(text, record) => (
            <Space size="middle">
            <Link to={{
                  pathname: "/dashboard-users/view-user",
                  state: { isAdd: false, record: record },
                }}
              >
                View
              </Link>
            <Link to={{
                  pathname: "/dashboard-users/add-user",
                  state: { isAdd: false, record: record },
                }}
              >
                Edit
              </Link>
              </Space>
          )}
        />
      </Table>
    </>
  );
}

export default UsersComponent;
