import { Button, message, Row, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditRatingVote from "./AddEditRatingVote";

function TitleRatingVotes({titleId}) {
  const [ratingVotesData, setRatingVotesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getRatingVotesData() }, []);
  const getRatingVotesData = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/rating_votes` })
      .then(({ data = [] } = {}) => {
        setRatingVotesData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const deleteRecord = (record) => {
        io({
          method: "delete",
          url: `/api/mastermeta/${titleId}/rating_votes/${record.id}`,
        })
          .then((data) => {
            message.success("Deleted successfully");
            getRatingVotesData();
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Title Rating Votes</h2>
        <AddEditRatingVote 
          isAdd={true}
          getRatingVotesData={getRatingVotesData} 
          titleId={titleId}/>
      </Row>
      <Table
        dataSource={ratingVotesData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Rating" dataIndex="rating" key="rating" align="center" />
        <Column title="Votes" dataIndex="votes" key="votes" align="center"  />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <Space>
                <AddEditRatingVote
                initialData={record}
                isAdd={false}
                getRatingVotesData={getRatingVotesData}
                />
                <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>    
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default TitleRatingVotes;
