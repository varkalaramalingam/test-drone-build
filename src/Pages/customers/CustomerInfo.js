import { Descriptions } from "antd";
import React from "react";

function CustomerInfo({ customerData }) {
  const startDate = new Date(customerData.subscriptionStartDate)
  const endDate = new Date(customerData.subscriptionEndDate)

  return (
    <React.Fragment>
      <Descriptions className="content-edit" title="User Info" bordered style={{ margin: "15px"}}>
        <Descriptions.Item label="Id">{customerData.id}</Descriptions.Item>
        <Descriptions.Item label="User Id">{customerData.personaId}</Descriptions.Item>
        <Descriptions.Item label="Subscription Type">{customerData.subscriptionType}</Descriptions.Item>
        <Descriptions.Item label="Active Period">{startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear()} - {endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear()}</Descriptions.Item>
        <Descriptions.Item label="Person Category">{customerData.personaCategory}</Descriptions.Item>
        <Descriptions.Item label="Device Type">{customerData.deviceType}</Descriptions.Item>
        <Descriptions.Item label="Locality">{customerData.locality}</Descriptions.Item>
        <Descriptions.Item label="Location">
        {customerData.location}
        </Descriptions.Item>
        <Descriptions.Item label="City">{customerData.city}</Descriptions.Item>
        <Descriptions.Item label="State">{customerData.state}</Descriptions.Item>
        <Descriptions.Item label="Country">{customerData.country}</Descriptions.Item>
        <Descriptions.Item label="Zipcode">{customerData.zipcode}</Descriptions.Item>
      </Descriptions>
    </React.Fragment>
  );
}

export default CustomerInfo;
