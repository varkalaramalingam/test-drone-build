import React, { useState } from "react";
import { BackTop, Layout } from "antd";
import "./App.css";
import { Content } from "antd/lib/layout/layout";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import PrivateRoute from "./components/PrivateRoute"
import SiderComponent from "./components/SiderComponent";
import HeaderComponent from "./components/HeaderComponent";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import FooterComponent from "./components/FooterComponent";
import Login from "./Pages/login/Login";
import CustomerListComponent from "./Pages/customers/CustomerListComponent";
import CustomerTabs from "./Pages/customers/CustomerTabs";
import NewCustomer from "./Pages/customers/NewCustomer";
import UserRolesComponent from "./Pages/dashboard-roles/UserRoles";
import ModelsComponent from "./Pages/models/models";
import LanguagesComponent from "./Pages/languages/Languages";
import ContentEditComponent from "./Pages/content/ContentEditComponent";
import AddEditPeople from "./Pages/people/AddEditPeople";
import ViewPeople from "./Pages/people/ViewPeople";
import AddEditPlot from "./Pages/content/plot/AddEditPlot";
import ViewPlot from "./Pages/content/plot/ViewPlot";
import ContentTabs from "./Pages/content/ContentTabs";
import ContentListComponent from "./Pages/content/ContentListComponent";
import PeopleListComponent from "./Pages/people/PeopleListComponent";
import TenantMoviesListComponent from "./Pages/tenants/TenantMoviesListComponent";
import AddEditTenantComponent from "./Pages/tenants/AddEditTenantComponent";
import TenantAssetsListComponent from "./Pages/tenants/tenantAssets/TenantAssetsListComponent";
import GenresComponent from "./Pages/genres/GenresComponent";
import Roles from "./Pages/roles/Roles";
import SubGenresComponent from "./Pages/genres/subgenres/SubGenresComponent";
import TitleMetaAttributes from "./Pages/meta-attributes/TitleMetaAttributes";
import AddEditUsers from "./Pages/dashboard-users/AddEditUsers";
import ViewUser from "./Pages/dashboard-users/ViewUser";
import Regions from "./Pages/regions/Regions";
import UsersComponent from "./Pages/dashboard-users/Users";
import Awards from "./Pages/awards/Awards";
import AwardCategories from "./Pages/award-categories/AwardCategories";
import ViewTenant from "./Pages/tenants/ViewTenant";
import RawDataCatalogue from "./Pages/rawData-catalogue/RawDataCatalogue";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));
  const history = useHistory()
  const [appUserName, setAppUserName] = useState("")
  const [appUserRole, setAppUserRole] = useState("")
  const [authToken, setAuthToken] = useState("")

  console.log(localStorage, localStorage.getItem("isAuthenticated"), isAuthenticated)
  
  const iconImg = React.createElement(
    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
    {
      className: "trigger",
      onClick: () => setCollapsed(!collapsed),
    }
  );

  const loggedIn = () => {
    setIsAuthenticated(true)
  }
  
  const loggedOut = () => {
    setIsAuthenticated(true)
  }

  const closeSideBar = (state) => {
    setCollapsed(state)
  }
  
  const openSideBar = (state) => {
    setCollapsed(state)
  }

  const notAuthenticated = () => {
    return (localStorage.getItem("isAuthenticated") ===false || localStorage.getItem("isAuthenticated") ===null 
    || localStorage.getItem("isAuthenticated") === "false" || localStorage.getItem("isAuthenticated") === undefined 
    || !localStorage.getItem("authToken"))
  }

  return (
    <React.Fragment>
      <Router>
        { notAuthenticated() ?
          <div>
            {/* <HeaderComponent icon={iconImg} /> */}
            <div className="login-height">
              <Content>
                <Switch>
                  <Route
                    exact path="/"
                    render={(props) =>  
                      <Login 
                        loggedIn={loggedIn} 
                        setAppUserName={setAppUserName} 
                        setAppUserRole={setAppUserRole} 
                        setAuthToken={setAuthToken}
                        {...props} 
                      /> 
                    }
                  />
                  <Route
                    exact path="/login"
                    render={(props) =>  
                      <Login 
                        loggedIn={loggedIn} 
                        setAppUserName={setAppUserName} 
                        setAppUserRole={setAppUserRole} 
                        setAuthToken={setAuthToken}
                        {...props} 
                      /> 
                    }
                  />
                  <PrivateRoute
                    path="/"
                    render={(props) =>  
                      <Login 
                        loggedIn={loggedIn} 
                        setAppUserName={setAppUserName} 
                        setAppUserRole={setAppUserRole} 
                        setAuthToken={setAuthToken}
                        {...props} 
                      /> 
                    }
                  />
                </Switch>
              </Content>
            </div>
            {/* <FooterComponent type="outer" /> */}
          </div> :
          <React.Fragment>
            <HeaderComponent icon={iconImg} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
              <Layout>
                <SiderComponent collapsed={collapsed} />
                <Layout>
                  <Layout style={{ padding: "0 24px 24px" }}>
                    <Content
                      className="site-layout-background"
                      style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                      }}
                    >
                      <BackTop />
                      <Switch>
                        {/* <Route exact path="/" component={Login} /> */}
                        <Route exact path="/users" component={CustomerListComponent} />
                        <Route exact path="/user/view" component={CustomerTabs} />
                        <Route exaxt path="/user/adduser" component={NewCustomer} />
                        <Route exact path="/user/edituser" component={NewCustomer} />
                        <Route exact path="/dashboard-accounts" component={UsersComponent} />
                        <Route exact path="/dashboard-users/add-user" component={AddEditUsers} />
                        <Route exact path="/dashboard-users/view-user" component={ViewUser} />
                        <Route exact path="/dashboard-user-roles" component={UserRolesComponent} />
                        <Route exact path="/models" component={ModelsComponent} />
                        <Route exact path="/languages" component={LanguagesComponent} />
                        <Route exact path="/catalogue" component={() => <ContentListComponent closeSideBar={closeSideBar} openSideBar={openSideBar} />} />
                        <Route exact path="/catalogue/edit-catalogue" component={ContentEditComponent} />
                        <Route exact path="/catalogue/add-catalogue" component={ContentEditComponent} />
                        <Route  path="/catalogue/view-catalogue/:id" component={ContentTabs} />
                        <Route exact path="/people" component={PeopleListComponent} />
                        <Route exact path="/people/add-people" component={AddEditPeople} />
                        <Route exact path="/people/:id/edit-people" component={AddEditPeople} />
                        <Route exact path="/people/:id" component={ViewPeople} />
                        <Route exact path="/plot/add-plot" component={AddEditPlot} />
                        <Route exact path="/plot/edit-plot" component={AddEditPlot} />
                        <Route exact path="/plot/view-plot" component={ViewPlot} />
                        <Route exact path="/tenants" component={TenantMoviesListComponent} />
                        <Route exact path="/tenants/add-tenant" component={AddEditTenantComponent} />
                        <Route exact path="/tenants/edit-tenant" component={AddEditTenantComponent} />
                        <Route exact path="/tenants/view-tenant" component={ViewTenant} />
                        <Route exact path="/tenantAssets" component={TenantAssetsListComponent} />
                        <Route exact path="/genre" component={GenresComponent} />
                        <Route exact path="/roles" component={Roles} />
                        <Route exact path="/subGenre" component={SubGenresComponent} />
                        <Route exact path="/meta-attributes" component={TitleMetaAttributes} />
                        <Route exact path="/regions" component={Regions} />
                        <Route exact path="/awards" component={Awards} />
                        <Route exact path="/award-category" component={AwardCategories} />
                        <Route exact path="/rawDataCatalogue" component={RawDataCatalogue} />
                      </Switch>
                    </Content>
                  </Layout>
                </Layout>
              </Layout>
            <FooterComponent type="inner" />
          </React.Fragment>
        }
      </Router>
    </React.Fragment>
  );
}
export default App;
