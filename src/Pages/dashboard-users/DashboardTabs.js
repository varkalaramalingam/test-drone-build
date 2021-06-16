import { Tabs } from "antd";
import React from "react";
import UsersComponent from "./Users";
import UserRoles from "../dashboard-roles/UserRoles";

const { TabPane } = Tabs;

function DashboardTabs() {
  return (
    <Tabs size="large">
      <TabPane tab="Accounts" key="1">
        <UsersComponent />
      </TabPane>
      <TabPane tab="Roles" key="2">
        <UserRoles />
      </TabPane>
    </Tabs>
  );
}

export default DashboardTabs;
