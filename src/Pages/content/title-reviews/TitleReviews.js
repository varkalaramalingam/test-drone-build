import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Column from "antd/lib/table/Column";
import { io } from "../../../api/io";
import AddEditTitleReview from "./AddEditTitleReview";

function TitleReview({ titleId }) {
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReviewsList();
  }, []);
  const getReviewsList = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/review` })
      .then(({ data = [] } = {}) => {
        setGenreData(data.resultsMap.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

   return (
    <>
      <AddEditTitleReview isAdd={true} titleId={titleId} getReviewsList={getReviewsList} />
      <Table dataSource={genreData} loading={loading} size="small" rowKey="id">
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="UserId" dataIndex="userId" key="userId" align="center" />
        <Column title="Source" dataIndex="source" key="source" align="center" />
        <Column title="Review Text" dataIndex="reviewText" key="reviewText"  />
        <Column title="Review Date" dataIndex="reviewDate" key="reviewDate" />
        <Column title="Likes" dataIndex="likes" key="likes" />
        <Column title="Dislikes" dataIndex="dislikes" key="dislikes" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
              <AddEditTitleReview
                isAdd={false}
                initialData={record}
                titleId={titleId}
                getReviewsList={getReviewsList}
              />
          )}
        />
      </Table>
    </>
  );
}

export default TitleReview;
