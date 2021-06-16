import { Button, message, Row, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditVote from "./AddEditVote";

function TitleVotes({titleId}) {
  const [episodesData, setEpisodesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getVotesData() }, []);
  const getVotesData = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/age_votes` })
      .then(({ data = [] } = {}) => {
        setEpisodesData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const deleteRecord = (record) => {
        io({
          method: "delete",
          url: `/api/mastermeta/${titleId}/age_votes/${record.id}`,
        })
          .then((data) => {
            message.success("Deleted successfully");
            getVotesData();
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Title Votes</h2>
        <AddEditVote 
          isAdd={true}
          getVotesData={getVotesData} 
          titleId={titleId}/>
      </Row>
      <Table
        dataSource={episodesData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Age Range" dataIndex="ageRange" key="ageRange" align="center" />
        <Column title="Votes" dataIndex="votes" key="votes" align="center"  />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <Space>
                <AddEditVote
                initialData={record}
                isAdd={false}
                getVotesData={getVotesData}
                />
                <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>    
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default TitleVotes;
