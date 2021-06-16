import React, { useEffect, useState } from "react";
import { Row, Table } from "antd";
import { io } from "../../api/io";
import Column from "antd/lib/table/Column";
import AddEditGenresComponent from "./AddEditGenresComponent";

function GenresComponent() {
  const [genreData, setGenreData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    io({ method: "get", url: "/api/genre" })
      .then(({ data = [] } = {}) => {
        setGenreData(data.resultsMap.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h2>Genres</h2>
        <AddEditGenresComponent getData={getData} isAdd={true} />
      </Row>
      <Table
        dataSource={genreData}
        loading={loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Genre" dataIndex="name" key="name" />
        <Column title="Active" dataIndex="active" key="active" />
        <Column title="ModifiedBy" dataIndex="modifiedBy" key="modifiedby" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <AddEditGenresComponent
              initialData={record}
              isAdd={false}
              getData={getData}
            />
          )}
        />
      </Table>
    </>
  );
}

export default GenresComponent;
