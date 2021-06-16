import { Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "../../../api/io";
import AddButton from "../../../components/AddButton";

const Plot = ({movieTitle,titleId}) => {
const [ plotData, setPlotData ] = useState([]);
const [ loading, setLoading ] = useState(false);
 
  useEffect(() => {
    io({ method: "get", url:`/api/mastermeta/${titleId}/plot?titleid=${titleId}` })
      .then(({ data = [] } = {}) => {
        setLoading(true);
        setPlotData(
          data.resultsMap.result.map((row) => ({
            plottext:row.plottext.substring(0, 50),
            totalPlottext:row.plottext,
            source: row.source,
            id: row.id,
            key: row.id,
            titleid: row.titleid,
            summary:row.summary.substring(0, 50),
            totalSummary:row.summary
          }))
        );
      })
      .catch((error) =>{
        console.log(error);
        setLoading(true);
      })
  }, [])

  return (
    <>
      <AddButton path="/plot/add-plot" addPage="Add Plot" isAdd={true} pageName="Plot" record={titleId}/>
      <Table
        dataSource={plotData}
        style={{ paddingBottom: "20px" }}
        scroll={{ x: 1200 }}
        loading={!loading}
        size="small"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Source" dataIndex="source" key="source"  />
        <Column title="PlotText" dataIndex="plottext" key="plottext" />
        <Column title="Summary" dataIndex="summary" key="summary" />
        <Column
          title="Action"
          key="action"
          align="center"
          width={100}
          render={(record) => (
            <Space size="middle">
            <Link
              to={{
                pathname: "/plot/view-plot",
                state: { isAdd: false, movieTitle:movieTitle, record: record },
              }}
            >
              View
            </Link>
            <Link
              to={{
                pathname: "/plot/edit-plot",
                state: { isAdd: false, record: record },
              }}
            >
              Edit
            </Link>
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default Plot;
