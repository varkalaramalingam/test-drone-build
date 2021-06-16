import { Button, message, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditCastCrew from "./AddEditCastCrew";

function CrewAndCast({ titleId }) {
  const [peopleRolesData, setPeopleRolesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => getTitleRoles(), []);

  const getTitleRoles = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/roles` })
      .then(({ data = [] } = {}) => {
        setPeopleRolesData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const deleteRecord = (record) => {
    io({
      method: "delete",
      url: `/api/mastermeta/title/roles/${record.id}`,
    })
      .then((data) => {
        message.success("Deleted successfully");
        getTitleRoles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AddEditCastCrew isAdd={true} titleId={titleId} getTitleRoles={getTitleRoles}/>
      <Table
        dataSource={peopleRolesData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="People Id" dataIndex="peopleId" key="peopleId" align="center" />
        <Column title="People Name" dataIndex="firstname" key="firstName" align="center" />
        <Column title="Role Id" dataIndex="roleId" key="roleId" align="center" />
        <Column title="Role Name" dataIndex="rolename" key="rolename" align="center" />
        <Column title="IsCast" dataIndex="isCast" key="isCast" align="center" />
        <Column title="IsCrew" dataIndex="isCrew" key="isCrew" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <>
              <AddEditCastCrew
                isAdd={false}
                initialData={record}
                titleId={titleId}
                getTitleRoles={getTitleRoles}
              />
              <Button type="link" onClick={() => deleteRecord(record)}>
                Delete
              </Button>
            </>
          )}
        />
      </Table>
    </>
  );
}

export default CrewAndCast;
