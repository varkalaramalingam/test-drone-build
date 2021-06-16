import { Button, message, Row, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../api/io";
import AddEditAwards from "./AddEditAwards";

function Regions({ titleId }) {
  const [regionsData, setRegionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAwardsData();
  }, []);
  const getAwardsData = () => {
    io({ method: "get", url: `/api/awards` })
      .then(({ data }) => {
        setRegionsData(data.resultsMap.result);
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
      url: `/api/awards/${record.id}`,
      data: { id: record.id },
    })
      .then((data) => {
        message.success("Deleted successfully");
        getAwardsData();
  })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Awards</h2>
        <AddEditAwards
          isAdd={true}
          getAwardsData={getAwardsData}
          titleId={titleId}
        />
      </Row>
      <Table
        dataSource={regionsData}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column
          title="Award Name"
          dataIndex="awardname"
          key="regionname"
          align="center"
        />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <>
              <AddEditAwards
                isAdd={false}
                initialData={record}
                getAwardsData={getAwardsData}
              />
            <Button type="link" onClick={() => deleteRecord(record) }>Delete</Button>
            </>
          )}
        />
      </Table>
    </>
  );
}

export default Regions;
