import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import Column from "antd/lib/table/Column";
import { io } from "../../../api/io";
import AddEditTitleGenre from "./AddEditTitleGenre";

function TitleGenres({ titleId }) {
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGenreList();
  }, []);
  
  const getGenreList = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/genre?titleid=${titleId}` })
      .then(({ data = [] } = {}) => {
        setGenreData(data.resultsMap.result);
        setLoading(true);
      })
      .catch(() => {
        console.log(false);
        setLoading(false);
      });
  };

  const deleteRecord = (record) => {
    io({
      method: "delete",
      url: `/api/mastermeta/${titleId}/genre`,
      data: { id: record.id },
    })
      .then((data) => {
        message.success("Deleted successfully");
        getGenreList();
  })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    { loading ?
    <>
      <AddEditTitleGenre isAdd={true} titleId={titleId} getGenreList={getGenreList} existingGenres={genreData}/>
      <Table dataSource={genreData} loading={!loading} size="small"  rowKey="id">
        <Column title="Id" dataIndex="id" key="id" align="center" width={100} />
        <Column title="GenreId" dataIndex="genreId" key="genreId" align="center" />
        <Column title="Genre" dataIndex="name" key="name" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
              <Button type="link" onClick={() => deleteRecord(record)}>
                Delete
              </Button>
          )}
        />
      </Table>
      </>
      : null}
    </>
  );
}

export default TitleGenres;
