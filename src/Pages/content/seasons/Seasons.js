import { Button, message, Row, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditSeason from "./AddEditSeason";

function Seasons({titleId}) {
  const [seasonsData, setSeasonsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getSeasonData() }, []);

  const getSeasonData = () => {
    io({ method: "get", url: `/api/${titleId}/seasons` })
      .then(({ data = [] } = {}) => {
        setSeasonsData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const deleteRecord = (record) => {
        io({
          method: "delete",
          url: `/api/${titleId}/seasons/${record.id}`,
        })
          .then((data) => {
            message.success("Deleted successfully");
            getSeasonData();
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Seasons</h2>
        <AddEditSeason isAdd={true} getSeasonData={getSeasonData} titleId={titleId}/>
      </Row>
      <Table
        dataSource={seasonsData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Season Name" dataIndex="seasons_name" key="seasons_name" align="center" />
        <Column title="Season Number" dataIndex="seasons_no" key="seasons_no" align="center" />
        <Column title="Season Description" dataIndex="seasons_discription" key="seasons_discription" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <Space>
                <AddEditSeason
                initialData={record}
                isAdd={false}
                getSeasonData={getSeasonData}
                />
                <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>    
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default Seasons;
