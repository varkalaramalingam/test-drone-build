import { Button, Descriptions, Row, Tabs } from 'antd'
import React from 'react'
import PeopleRoles from './PeopleRoles';
import Awards from './PeopleAwards';
import PeopleAwards from './peopleAwards/PeopleAwards';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LeftOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function ViewPeople({match}) {
  let history = useHistory();
  let location = useLocation();
  let initialData = location?.state?.record;
  let selectedTab = location?.search?.substring(1, location.search.length);
  let peopleId = location?.state?.record?.id;
  
    return (
       <>
     <Row style={{ justifyContent: "space-between" }}>
       <h2>People Name : {initialData?.firstname} {initialData?.lastname} - {initialData?.id}</h2>
       <Button onClick={() => history.push("/people")} icon={<LeftOutlined />}>Back</Button>
     </Row>
     <Tabs size="large"
        defaultActiveKey={selectedTab}
        onChange={key => {
          history.push({
            pathname: `${match.url}`,
            search: `${key}`,
            state: { record: location?.state?.record },
        });
      }}>
      <TabPane tab="People Info" key="people-info">
        <Row style={{ justifyContent: "space-between" }}>
          <h2>People</h2>
          <Button type="primary">
          <Link to={{
              pathname: `/people/${peopleId}/edit-people`,
              state: { isAdd: false },
              }}
            >Edit People</Link>
        </Button>
        </Row>
        <Descriptions bordered labelStyle={{fontSize:"15px", fontWeight:"bolder"}} className="content-edit">
        <Descriptions.Item label="FirstName" span={2}>{initialData?.firstname}</Descriptions.Item>
        <Descriptions.Item label="LastName" span={2}>{initialData?.lastname}</Descriptions.Item>
        <Descriptions.Item label="Age" span={2}>{initialData?.age}</Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>{initialData?.email} </Descriptions.Item>
        <Descriptions.Item label="Introduced Year" span={2}>{initialData?.introduced_year}</Descriptions.Item>
        <Descriptions.Item label="Marital Status" span={2}>{initialData?.maritalstatus}</Descriptions.Item>
        <Descriptions.Item label="Media Title" span={2}> {initialData?.mediatitle}</Descriptions.Item>
        <Descriptions.Item label="Summary" span={2}> {initialData?.summary}</Descriptions.Item>
        </Descriptions>
        </TabPane>
      <TabPane tab="Roles" key="roles">
        <PeopleRoles peopleId={initialData?.id}/>
      </TabPane>
      <TabPane tab="Awards" key="awards">
        <PeopleAwards peopleId={initialData?.id}/>
      </TabPane>
      <TabPane tab="Title Awards" key="title-awards">
        <Awards peopleId={initialData?.id}/>
      </TabPane>
      </Tabs>
        </>
    )
}

export default ViewPeople
