import { Button, message, Row, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditBoxOffice from "./AddEditBoxOffice";

function BoxOffice({titleId}) {
  const [seasonsData, setSeasonsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getBoxOfficeData() }, []);

  const getBoxOfficeData = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/titleBoxOffice` })
      .then(({ data = [] } = {}) => {
        setSeasonsData(
          data.resultsMap.result.map((row) => ({
            budgetValue: (Math.abs(Number(row.budget)) / 1.0e+6).toFixed(2),
            revenueValue: (Math.abs(Number(row.revenue)) / 1.0e+6).toFixed(2),
            budget : row.budget,
            revenue:row.revenue,
            hit: row.hit,
            boxoffice_text: row.boxoffice_text,
            id: row.id,
            key: row.id,
          }))
        );
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const deleteRecord = (record) => {
        io({
          method: "delete",
          url: `/api/mastermeta/${titleId}/titleBoxOffice/${record.id}`,
        })
          .then((data) => {
            message.success("Deleted successfully");
            getBoxOfficeData();
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Seasons</h2>
        <AddEditBoxOffice isAdd={true} getBoxOfficeData={getBoxOfficeData} titleId={titleId}/>
      </Row>
      <Table
        dataSource={seasonsData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Budget (Millions)" dataIndex="budgetValue" key="budget" align="center" />
        <Column title="Revenue  (Millions)" dataIndex="revenueValue" key="revenue" align="center" />
        <Column title="Hit" dataIndex="hit" key="hit" align="center" />
        <Column title="Boxoffice Text" dataIndex="boxoffice_text" key="boxoffice_text" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <Space>
                <AddEditBoxOffice
                initialData={record}
                isAdd={false}
                titleId={titleId}
                getBoxOfficeData={getBoxOfficeData}
                />
                <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>    
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default BoxOffice;
