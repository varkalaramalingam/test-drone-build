import { Button, message, Row, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { io } from "../../api/io";
import AddEditCategory from "./AddEditCategory";

function Regions({titleId}) {
  const [regionsData, setRegionsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getCategoriesData() }, []);
  const getCategoriesData = () => {
    io({ method: "get", url: `/api/category` })
      .then(({data}) => {
        setRegionsData(data.resultsMap.result);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const deleteRecord = (record) => {
    io({
      method: "delete",
      url: `/api/category/${record.id}`,
      data: { id: record.id },
    })
      .then((data) => {
        message.success("Deleted successfully");
        getCategoriesData();
  })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Award Categories</h2>
        <AddEditCategory isAdd={true} getCategoriesData={getCategoriesData} titleId={titleId}/>

      </Row> 
      <Table
        dataSource={regionsData}
        loading={!loading}
        size="small"
        rowKey="id"
      >
        <Column title="Id" dataIndex="id" key="id" align="center" />
        <Column title="Category Name" dataIndex="categoryname"  key="regionname" align="center" />
        <Column title="Category Type" dataIndex="category_type"  key="category_type" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text, record) => (
            <>
            <AddEditCategory isAdd={false} initialData={record} getCategoriesData={getCategoriesData}/>
            <Button type="link" onClick={() => deleteRecord(record) }>Delete</Button>
            </>
          )}
        />
      </Table>
    </>
  );
}

export default Regions;
