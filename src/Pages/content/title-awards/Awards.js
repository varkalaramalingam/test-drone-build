import { Button, message, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditAwards from "./AddEditAwards";

function Awards({titleId}) {
  const [regionsData, setRegionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getAwardsData() }, []);
  const getAwardsData = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/award` })
      .then(({data}) => {
        setRegionsData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }

  const deleteRecord = (record) => {
    io({
      method: "delete",
      url: `/api/mastermeta/${titleId}/awards/${record.id}`,
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
      <AddEditAwards isAdd={true} getAwardsData={getAwardsData} titleId={titleId}/>
      <Table
        dataSource={regionsData}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Award Id" dataIndex="awardsId" key="awardsId" align="center" />
        <Column title="Award Name" dataIndex="awardname" key="awardname" align="center" />
        <Column title="Category Id" dataIndex="categoryId" key="categoryId" align="center" />
        <Column title="Category Name" dataIndex="categoryname" key="categoryname" align="center" />
        <Column title="Nomination" dataIndex="nominate" key="nominate" align="center" />
        <Column title="Year" dataIndex="year" key="year" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <>
            <AddEditAwards isAdd={false} initialData={record} getAwardsData={getAwardsData} titleId={titleId}/>
            <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>
            </>
          )}
        />
      </Table>
    </>
  );
}

export default Awards;
