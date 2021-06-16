import React from 'react'
import { Tabs } from "antd"
import { useLocation } from "react-router";
import BackButton from "../../components/BackButton"
import CustomerDetailsComponent from "../customers/CustomerDetailsComponent"
import RegisteredDevicesComponent from "./RegisteredDevices"

const { TabPane } = Tabs;
export default function CustomerTabs() {
    
    const location = useLocation();
    const customerData = location.state.record;

    return (
        <div>
            <BackButton pageName={`User Details : ${customerData.personaId}`}/>
            <Tabs size="large">
                <TabPane tab="Basic Info" key={1}>
                    <CustomerDetailsComponent customerData={customerData} />
                </TabPane>
                <TabPane tab="Register Devices">
                    <RegisteredDevicesComponent customerData={customerData} />
                </TabPane>
            </Tabs>
        </div>
    )
}
