import { Button, message, Row, Space, Table} from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditPeopleAward from "./AddEditPeopleAward";

const {Column} = Table;
function PeopleAwards(peopleId) {
  const [peopleRolesData, setPeopleRolesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {getPeopleAwards()}, []);
    function getPeopleAwards(){
    io({ method: "get", url: `/api/${peopleId.peopleId}/awards` })
      .then(({ data = [] } = {}) => {
        setPeopleRolesData(data.resultsMap.result);
        setLoading(true);
      })
      .catch(() => {
        console.log(false);
        setLoading(false);
      });
    }

    const deleteRecord = (record) => {
      io({
        method: "delete",
        url: `/api/people/awards/${record.id}`,
      })
        .then((data) => {
          message.success("Deleted successfully");
          getPeopleAwards();
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
  
  return (
    <>
     <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Regions</h2>
        <AddEditPeopleAward isAdd={true} getPeopleAwards={getPeopleAwards} peopleId={peopleId}/>
    </Row>
     <Table
        dataSource={peopleRolesData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" align="center" />
        <Column title="Award Id" dataIndex="awardsId" align="center" />
        <Column title="Award Name" dataIndex="awardname" align="center" />
        <Column title="Category Id" dataIndex="categoryId" align="center" />
        <Column title="Category Name" dataIndex="categoryname" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          width={180}
          fixed="right"
          render={(record) => (
            <Space size="middle">
            <AddEditPeopleAward initialData={record} isAdd={false} getPeopleAwards={getPeopleAwards} peopleId={peopleId} />
            <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default PeopleAwards;