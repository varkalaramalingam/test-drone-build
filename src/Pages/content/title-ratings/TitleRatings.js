import React, { useEffect, useState } from "react";
import { Button, message, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { io } from "../../../api/io";
import AddEditTitleRating from "./AddEditTitleRating";

function TitleRatings({ titleId }) {
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRatingList();
  }, []);
  const getRatingList = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/ratings` })
      .then(({ data = [] } = {}) => {
        setGenreData(data.resultsMap.result);
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
      url: `/api/mastermeta/${titleId}/ratings/${record.id}`,
    })
      .then((data) => {
        message.success("Deleted successfully");
        getRatingList();
      })
      .catch((error) => {
        console.log(error);
      });
  };


   return (
    <>
      <AddEditTitleRating isAdd={true} titleId={titleId} getRatingList={getRatingList} />
      <Table dataSource={genreData} loading={!loading} size="small" rowKey="id" scroll={{x:"auto"}}>
        <Column title="Id" dataIndex="id" key="id" align="center" width={100} />
        <Column title="TitleId" dataIndex="titleid" key="titleid" align="center" width={100} />
        <Column title="Source" dataIndex="source" key="source" align="center" />
        <Column title="Rating" dataIndex="rating" key="rating" align="center" />
        <Column title="Normalized Rating" dataIndex="normalizedRating" key="normalizedRating" align="center" />
        <Column title="Weightage" dataIndex="weightage" key="weightage" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
              <Space>
                 <AddEditTitleRating
                isAdd={false}
                initialData={record}
                titleId={titleId}
                getRatingList={getRatingList}
              />
                <Button type="link" onClick={() => deleteRecord(record)}>Delete</Button>    
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default TitleRatings;
