import { Button, message, Row, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditSeason from "./AddEditEpisode";

function Episodes({titleId, metaTitleId, title}) {
  const [episodesData, setEpisodesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getEpisodesData() }, []);
  
  const getEpisodesData = () => {
    io({ method: "get", url: `/api/${titleId}/episodes` })
      .then(({ data = [] } = {}) => {
        setEpisodesData((
          data.resultsMap.result.map((row) => ({
            seasonsId: row.seasonsId,
            id: row.id,
            key: row.id,
            episode_No: row.episode_No,
            episode_name: title,
          }))
        ));
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const deleteRecord = (record) => {
        io({
          method: "delete",
          url: `/api/${titleId}/episodes/${record.id}`,
        })
          .then((data) => {
            message.success("Deleted successfully");
            getEpisodesData();
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Seasons</h2>
        <AddEditSeason isAdd={true} getEpisodesData={getEpisodesData} titleId={titleId} metaTitleId={metaTitleId} />
      </Row>
      <Table
        dataSource={episodesData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Season Id" dataIndex="seasonsId" key="seasonsId" align="center" />
        <Column title="Episode Number" dataIndex="episode_No" key="episode_No" align="center"  />
        <Column title="Episode Name" dataIndex="episode_name" key="episode_discription" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <Space>
                <AddEditSeason
                initialData={record}
                isAdd={false}
                titleId={titleId}
                getEpisodesData={getEpisodesData}
                metaTitleId={metaTitleId}
                />
                <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>    
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default Episodes;
