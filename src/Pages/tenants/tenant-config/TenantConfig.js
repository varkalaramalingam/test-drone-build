import { Table, Space, message, Button } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditTenantConfig from "./AddEditTenantConfig";

function TenantConfig({tenantId}) {
  const [tenantData, setTenantData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getTenantConfigData() }, []);

  const getTenantConfigData = () => {
    io({ method: "get", url: "/api/tenant/config" })
      .then(({ data = [] } = {}) => {
        setTenantData(
          data.resultsMap.result.map((row) => ({
            id: row.id,
            key: row.id,
            tenantId:row.tenantId,
            dbUsername: row.dbUsername,
            dbPasswordValue: row.dbPassword.replace(/[a-zA-Z0-9@#$%]/g,"*"),
            dbPassword: row.dbPassword,
            accountId: row.accountId,
            accountApiKey: row.accountApiKey,
            topicName: row.topicName,
            topicGroup: row.topicGroup,
            elk_username: row.elk_username,
            elk_password: row.elk_password,
            index_name: row.index_name,
            elk_url: row.elk_url,
            active: row.active
          }))
        );
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }


  return (
    <>
      <AddEditTenantConfig isAdd={true} getTenantConfigData={getTenantConfigData} tenantId={tenantId}/>
      <Table
        dataSource={tenantData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
        scroll={{ x: 2100 }}
      >
        <Column title="Id" dataIndex="id" key="id" align="center"  width={50}/>
        <Column title="Tenant Id" dataIndex="tenantId" key="tenantId" align="center" width={100} />
        <Column title="Index Name" dataIndex="index_name" key="index_name" align="center" width={150} />
        <Column title="Active" dataIndex="active" key="active" align="center" width={100} />
        <Column title="DB User Name" dataIndex="dbUsername" key="dbUsername" align="center" width={150} />
        <Column title="DB Password" dataIndex="dbPasswordValue" key="dbPasswordValue" align="center" width={100} />
        <Column title="Account Id" dataIndex="accountId" key="accountId" align="center" />
        <Column title="Account ApiKey" dataIndex="accountApiKey" key="accountApiKey" align="center" />
        <Column title="Topic Name" dataIndex="topicName" key="topicName" align="center" />
        <Column title="Topic Group" dataIndex="topicGroup" key="topicGroup" align="center" />
        <Column title="ELK User Name" dataIndex="elk_username" key="elk_username" align="center" width={150} />
        <Column title="ELK Password" dataIndex="elk_password" key="elk_password" align="center" width={150} />
        <Column title="ELK Url" dataIndex="elk_url" key="elk_url" align="center" width={450} />
        <Column
          title="Action"
          key="action"
          align="center"
          fixed="right"
          width={150}
          render={(record) => (
            <Space size="small">
              <Button type="link" onClick={() => message.success("Tenant Config Inactive")}>Delete</Button>
              <AddEditTenantConfig isAdd={false} initialData={record} getTenantConfigData={getTenantConfigData} tenantId={tenantId}/>
            </Space>
        )}
        />
       </Table> 
    </>
  );
}

export default TenantConfig;
