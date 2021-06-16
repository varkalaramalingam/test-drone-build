import { Button, message, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import AddEditAliase from "./AddEditAliase";

const { Column } = Table;

function TitleVotes({titleId}) {
  const [aliasesData, setAliasesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getAliasesData() }, []);
  const getAliasesData = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/aliases` })
      .then(({ data = [] } = {}) => {
        setAliasesData(
          data.resultsMap.result.map((row) => ({
            aliasesTitleId:row.aliasesTitleId,
            aliasTitleName: row.aliasTitleName,
            id: row.aliasesTitleId,
            idNumber: row.id,
            key: row.id,
            metaTitleId: row.metaTitleId,
            languageId:row.languageId,
            language:row.language,
            regionId:row.regionId,
            regionname:row.regionname
          }))
        );
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    const deleteRecord = (id) => {
        io({
          method: "delete",
          url: `/api/mastermeta/${titleId}/aliases/${id}`,
        })
          .then((data) => {
            message.success("Deleted successfully");
            getAliasesData();
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <h2 style={{ float: "left" }}>Title Aliases</h2>
        <AddEditAliase 
          isAdd={true}
          getAliasesData={getAliasesData} 
          titleId={titleId}/>
      </Row>
      <Table
        dataSource={aliasesData}
        style={{ paddingBottom: "20px" }}
        loading={!loading}
        size="small"
        rowKey="id"
        scroll={{ x: 1000}}
      >
        <Column title="Id" dataIndex="idNumber" key="idNumber" align="center" width={50} />
        <Column title="Meta Title Id" dataIndex="metaTitleId" key="metaTitleId" align="center"  />
        <Column title="Alias Title Id" dataIndex="aliasesTitleId" key="aliasesTitleId" align="center"  />
        <Column title="Alias Title Name" dataIndex="aliasTitleName" key="aliasTitleName" align="center"  />
        <Column title="Language Id" dataIndex="languageId" key="languageId" align="center"  />
        <Column title="Language Name" dataIndex="language" key="language" align="center"  />
        <Column title="Region Id" dataIndex="regionId" key="regionId" align="center" />
        <Column title="Region Name" dataIndex="regionname" key="regionname" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          fixed="right"
          render={(text, record) => (
            <Space>
                <AddEditAliase
                initialData={record}
                isAdd={false}
                getAliasesData={getAliasesData}
                />
                <Button type="link" onClick={() => deleteRecord(record?.idNumber)}>Delete</Button>    
            </Space>
          )}
        />
      </Table>
    </>
  );
}

export default TitleVotes;
