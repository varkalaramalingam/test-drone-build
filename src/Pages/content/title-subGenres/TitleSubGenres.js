import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import Column from "antd/lib/table/Column";
import { io } from "../../../api/io";
import AddEditTitleSubGenre from "./AddEditTitleSubGenre"

function TitleSubGenres({ titleId }) {
  const [subGenreData, setGubGenreData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGenreList();
  }, []);
  const getGenreList = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/subgenre` })
      .then(({ data = [] } = {}) => {
        setGubGenreData(data.resultsMap.result);
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
      url: `/api/mastermeta/${titleId}/subgenre`,
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
    {loading ?
    <> 
      <AddEditTitleSubGenre isAdd={true} titleId={titleId} getGenreList={getGenreList} existingSubGenres={subGenreData} />
      <Table dataSource={subGenreData} loading={!loading} size="small" rowKey="id">
        <Column title="Id" dataIndex="id" key="id" align="center" width={100} />
        <Column title="Sub Genre Id" dataIndex="subgenreId" key="subgenreId" align="center" />
        <Column title="Sub Genre" dataIndex="name" key="name" align="center" />
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
      : null }
    </>
  );
}

export default TitleSubGenres;
