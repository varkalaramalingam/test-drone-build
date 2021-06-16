import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const { Sider } = Layout;
const { SubMenu } = Menu;

function SiderComponent(props) {

  const location = useLocation()

  return (
    <>
      <Sider
        theme="dark"
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        collapsedWidth="0"
        breakpoint="lg"
        width={200}
        style={{ minHeight: "90vh", maxHeight: "auto" }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/dashboard-accounts']}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={['subMenu1']}
          style={{ height: "100%", borderRight: 0 }}
        >
          {/*======== Dashboard ======= */}
          <SubMenu key="subMenu1" title="Dashboard">
            <Menu.Item key="/dashboard-accounts">
              <Link to="/dashboard-accounts">Accounts</Link>
            </Menu.Item>
            <Menu.Item key="/dashboard-user-roles">
              <Link to="/dashboard-user-roles">Roles</Link>
            </Menu.Item>
          </SubMenu>
          {/*======== Tenants ======= */}
          <SubMenu key="subMenu2" title="Tenants">
            <Menu.Item key="/tenants">
              <Link to="/tenants">Tenants</Link>
            </Menu.Item>
            <Menu.Item key="/tenantAssets">
              <Link to="/tenantAssets">Tenant Assets</Link>
            </Menu.Item>
          </SubMenu>
          {/*======== Master Meta ======= */}
          <SubMenu key="subMenu3" title="Master Meta">
            <Menu.Item key="/genre">
              <Link to="/genre">Genres</Link>
            </Menu.Item>
            <Menu.Item key="/subGenre">
              <Link to="/subGenre">Sub Genres</Link>
            </Menu.Item>
            <Menu.Item key="/languages">
              <Link to="/languages">Languages</Link>
            </Menu.Item>
            <Menu.Item key="/roles">
              <Link to="/roles">Roles</Link>
            </Menu.Item>
            <Menu.Item key="/regions">
              <Link to="/regions">Regions</Link>
            </Menu.Item>
            <Menu.Item key="/meta-attributes">
              <Link to="/meta-attributes">Meta Attributes</Link>
            </Menu.Item>
            <Menu.Item key="/awards">
              <Link to="/awards">Awards</Link>
            </Menu.Item>
            <Menu.Item key="/award-category">
              <Link to="/award-category">Award Categories</Link>
            </Menu.Item>
          </SubMenu>
          {/*======== Users ======= */}
          <Menu.Item key="/users">
            <Link to="/users">Users</Link>
          </Menu.Item>
          {/*======== Unified Model ======= */}
          <Menu.Item key="/catalogue">
            <Link to="/catalogue">Unified Model</Link>
          </Menu.Item>
          <Menu.Item key="/people">
            <Link to="/people">People</Link>
          </Menu.Item>
          {/*======== Ml Model ======= */}
          <Menu.Item key="/models">
            <Link to="/models">ML Models</Link>
          </Menu.Item>
          {/*======== Raw Catalogue ======= */}
          <Menu.Item key="/rawDataCatalogue">
            <Link to="/rawDataCatalogue">Raw Data Catalogue</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
export default SiderComponent;
