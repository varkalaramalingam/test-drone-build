import { Descriptions, Tabs } from 'antd'
import React from 'react'
import BackButton from "../../components/BackButton"
import { useLocation } from "react-router-dom";import TenantConfig from './tenant-config/TenantConfig';
;

const { TabPane } = Tabs;

function ViewTenant() {
  let location = useLocation();
  let initialData = location.state.record;
  
    return (
      <>
      <BackButton pageName={`Tenant : ${initialData.tenantName} - ${initialData.tenantCode}`}/>
      <Tabs size="large">
        <TabPane tab="Tenant Info" key="1">     
         <Descriptions bordered labelStyle={{fontSize:"15px", fontWeight:"bolder"}} className="content-edit">
          <Descriptions.Item label="Tenant Name" span={2}>{initialData.tenantName}</Descriptions.Item>
          <Descriptions.Item label="Tenant Code" span={2}>{initialData.tenantCode}</Descriptions.Item>
          <Descriptions.Item label="Tenant Type" span={2}>{initialData.tenantType}</Descriptions.Item>
          <Descriptions.Item label="Active" span={2}>{initialData.active}</Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>{initialData.email} </Descriptions.Item>
          <Descriptions.Item label="Contact" span={2}>{initialData.contactNumber}</Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>{initialData.address} </Descriptions.Item>
          <Descriptions.Item label="City" span={2}>{initialData.city}</Descriptions.Item>
          <Descriptions.Item label="State" span={2}>{initialData.state}</Descriptions.Item>
          <Descriptions.Item label="Country" span={2}>{initialData.country}</Descriptions.Item>
         </Descriptions>
        </TabPane>
        <TabPane tab="Tenant Config" key="2">
          <TenantConfig tenantId={initialData.id}/>
        </TabPane>
       </Tabs>
      </>
    )
}

export default ViewTenant
