import { Table, Space, message } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { io } from "../../api/io";
import AddButton from "../../components/AddButton";

function TenantMoviesListComponent() {
  const [tenantData, setTenantData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getTenantData() }, []);

  const getTenantData = () => {
    io({ method: "get", url: "/api/tenant" })
      .then(({ data = [] } = {}) => {
        setTenantData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }

    const deleteTenantOnClick = (rowId) =>{
        deleteTenant(rowId);
    }

    const deleteTenant = (id) => {
        io({ method: "delete", url: `/api/tenant/${id}` })
        .then(({data = [] } = {}) => {
            message.success("Tenant is Inactive");
            getTenantData();
            setLoading(true);
        })
        .catch((error) =>{
            message.error(error.message);
            setLoading(false);
        })
    }

  return (
    <>

      <AddButton path="/tenants/add-tenant" addPage="Add Tenant" pageName="Tenant"  isAdd="true" />
      <Table
        dataSource={tenantData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
        scroll={{ x: 900 }}
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Tenant Code" dataIndex="tenantCode" key="tenantCode" align="center" />
        <Column title="Tenant Name" dataIndex="tenantName" key="tenantName" align="center" />
        <Column title="Tenant Type" dataIndex="tenantType" key="tenantType" align="center" />
        <Column title="Active" dataIndex="active" key="active" align="center" />
        <Column title="Contact Number" dataIndex="contactNumber" key="contactNumber" align="center" />
        <Column title="Email" dataIndex="email" key="email" align="center" />
        <Column title="Address" dataIndex="address" key="address" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          fixed="right"
          render={(record) => (
            <Space size="middle">
              <Link title="View"
                to={{
                    pathname: "/tenants/view-tenant",
                    state: { isAdd: false, record: record },
                }}><EyeOutlined /></Link>
                <Link title="Edit"
                to={{
                    pathname: "/tenants/edit-tenant",
                    state: { isAdd: false, record: record },
                }}><EditOutlined /></Link>
                <Link title="Delete" onClick={() => deleteTenantOnClick(record.id)} 
                disabled={(record.active === 0) ? true : false}
                to={{state: { isAdd: false, record: record },
                }}><DeleteOutlined /></Link>
            </Space>
        )}
        />
      </Table>
    </>
  );
}

export default TenantMoviesListComponent;
