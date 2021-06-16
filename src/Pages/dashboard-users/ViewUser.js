import { Button, Descriptions, Tabs } from 'antd'
import React from 'react'
import BackButton from "../../components/BackButton"
import { Link, useLocation } from "react-router-dom";
import UserRoles from './user-roles/UserRoles';
import Password from './user-roles/Password';

const { TabPane } = Tabs;

function ViewUser(props) {
  let location = useLocation();
  let initialData = location.state.record;
  
    return (
       <>
       <BackButton pageName={`User Name : ${initialData.fname} ${initialData.lname}`}/>
     <Tabs size="large">
      <TabPane tab="User Info" key="1">
        <div  style={{ marginBottom:"40px" }} >
        <Button type="primary" style={{ float:"right" }}>
        <Link to={{ pathname: "/dashboard-users/add-user", state: { record: initialData } }}>
          Edit User
        </Link>
        </Button>
        <Password credentialsId={initialData.credentialsId} userId={initialData.userDetailsId}/> 
        </div>        
        <Descriptions bordered labelStyle={{fontSize:"15px", fontWeight:"bolder"}} className="content-edit">
        <Descriptions.Item label="FirstName" span={2}>{initialData.fname}</Descriptions.Item>
        <Descriptions.Item label="LastName" span={2}>{initialData.lname}</Descriptions.Item>
        <Descriptions.Item label="Contact" span={2}>{initialData.contactnumber}</Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>{initialData.emailid} </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>{initialData.address} </Descriptions.Item>
        </Descriptions>
        </TabPane>
      <TabPane tab="Roles" key="2">
        <UserRoles userId={initialData.userDetailsId}/>
      </TabPane>
      </Tabs>
        </>
    )
}

export default ViewUser
