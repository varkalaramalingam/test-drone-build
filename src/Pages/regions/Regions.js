import { Row, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../api/io";
import AddEditRegions from "./AddEditRegion";

function Regions({titleId}) {
  const [regionsData, setRegionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getRegionsData() }, []);
  const getRegionsData = () => {
    io({ method: "get", url: `/api/mastermeta/region` })
      .then(({data}) => {
        setRegionsData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <> 
    <Row style={{ justifyContent: "space-between" }}>
      <h2>Regions</h2>
      <AddEditRegions isAdd={true} getRegionsData={getRegionsData} titleId={titleId}/>
      </Row>
      <Table
        dataSource={regionsData}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Region Name" dataIndex="regionname"  key="regionname" align="center" />
        <Column title="Region Code" dataIndex="region" key="region" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <>
            <AddEditRegions isAdd={false} initialData={record} getRegionsData={getRegionsData}/>
            </>
          )}
        />
      </Table>
    </>
  );
}

export default Regions;
