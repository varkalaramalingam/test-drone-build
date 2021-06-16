import { Button } from "antd";
import React from "react";
import { useHistory, useLocation } from "react-router";
import CustomerRecommendedTitles from "./CustomerRecommendedTitles";
import CustomerViewHistory from "./CustomerViewHistory";
import { LeftOutlined } from "@ant-design/icons";
import CustomerInfo from "./CustomerInfo";

function CustomerDetailsComponent({ customerData }) {

  return (
    <React.Fragment>
      <CustomerInfo customerData={customerData} />
      {/* <CustomerViewHistory customerData={customerData} />
      <CustomerRecommendedTitles customerData={customerData} /> */}
    </React.Fragment>
  );
}

export default CustomerDetailsComponent;
