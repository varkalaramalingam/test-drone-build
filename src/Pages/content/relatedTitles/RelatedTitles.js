import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import Column from "antd/lib/table/Column";
import { io } from "../../../api/io";
import AddEditRelatedTitle from "./AddEditRelatedTitle";

function RelatedTitles({ titleId }) {
  const [relatedData, setRelatedData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRelatedTitlesList();
  }, []);
  
  const getRelatedTitlesList = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/related?titleid=${titleId}` })
      .then(({ data = [] } = {}) => {
        setRelatedData(data.resultsMap.result.relatedTitleIdDTOList);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  };

  const deleteRecord = (record) => {
    io({
      method: "delete",
      url: `/api/mastermeta/${titleId}/related?id=${record.id}`,
      data: { id: record.id },
    })
      .then((data) => {
        message.success("Deleted successfully");
        getRelatedTitlesList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AddEditRelatedTitle
        isAdd={true}
        titleId={titleId}
        getRelatedTitlesList={getRelatedTitlesList}
        row="id"
      />
      <Table
        dataSource={relatedData}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" width={100} />
        <Column title="RelatedTitleId" dataIndex="relatedTitleId" key="relatedTitleId" align="center" />
        <Column title="RelatedTitle" dataIndex="title" key="title" align="center" />
        <Column title="Rank" dataIndex="ranking" key="ranking" align="center" />
        <Column title="Action" key="action" align="center"
          render={(text, record) => (
            <>
              <Button type="link" onClick={() => deleteRecord(record)}>
                Delete
              </Button>
              <AddEditRelatedTitle
                isAdd={false}
                initialData={record}
                titleId={titleId}
                getRelatedTitlesList={getRelatedTitlesList}
              />
            </>
          )}
        />
      </Table>
    </>
  );
}

export default RelatedTitles;
