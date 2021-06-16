import { Table} from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../api/io";

const {Column} = Table;
function PeopleAwards(peopleId) {
  const [peopleRolesData, setPeopleRolesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {getPeopleRole()}, []);
    function getPeopleRole(){
    io({ method: "get", url: `/api/mastermeta/{titleid}/awards/${peopleId.peopleId}` })
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
      >
        <Column title="Title Id" dataIndex="titleId" align="center" />
        <Column title="Title Name" dataIndex="title" align="center" />
        <Column title="Award Id" dataIndex="awardsId" align="center" />
        <Column title="Award Name" dataIndex="awardname" align="center" />
        <Column title="Category Id" dataIndex="categoryId" align="center" />
        <Column title="Category" dataIndex="categoryname" align="center" />
        <Column title="Nomination" dataIndex="nominate" align="center" />
        <Column title="Year" dataIndex="year" align="center" />
      </Table>
    </>
  );
}

export default PeopleAwards;