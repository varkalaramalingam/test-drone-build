import { Table} from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../api/io";

const {Column} = Table;
function PeopleRoles(peopleId) {
  const [peopleRolesData, setPeopleRolesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {getPeopleRole()}, []);
    function getPeopleRole(){
    io({ method: "get", url: `/api/people/roles/${peopleId.peopleId}` })
      .then(({ data = [] } = {}) => {
        setPeopleRolesData(data.resultsMap.result);
        setLoading(true);
      })
      .catch(() => {
        console.log(false);
        setLoading(false);
      });
    }
  
  
  return (
    <>
     <Table
        dataSource={peopleRolesData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="TitleId" dataIndex="titleId" key="titleId" align="center" />
        <Column title="TitleName" dataIndex="title" key="title" align="center" />
        <Column title="RoleId" dataIndex="roleId" key="roleId" align="center" />
        <Column title="RoleName" dataIndex="rolename" key="rolename" align="center" />
        <Column title="IsCast" dataIndex="isCast" key="isCast" align="center" />
        <Column title="IsCrew" dataIndex="isCrew" key="isCrew" align="center" />
      </Table>
    </>
  );
}

export default PeopleRoles;