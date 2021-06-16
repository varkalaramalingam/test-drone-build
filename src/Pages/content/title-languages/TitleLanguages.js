import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import Column from "antd/lib/table/Column";
import { io } from "../../../api/io";
import AddEditTitleLanguage from "./AddEditTitleLanguage";

function TitleLanguages({ titleId }) {
  const [languageData, setLanguageData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getLanguageList();
  }, []);

  const getLanguageList = () => {
    io({ method: "get", url: `/api/mastermeta/${titleId}/language` })
      .then(({ data = [] } = {}) => {
        setLanguageData(data.resultsMap.result);
        setLoading(true);
      })
      .catch(() => {
        console.log(false);
        setLoading(false);
      });
  };

  const deleteRecord = (record) => {
    io({ method: "delete", url: `/api/mastermeta/${titleId}/language`, data: { id :record.id } })
      .then((data) => {
        message.success("Deleted successfully");
        getLanguageList();
  })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

 

  return (
    <>
    {loading ?
    <>
      <AddEditTitleLanguage isAdd={true} titleId={titleId} getLanguageList={getLanguageList} existingLanguages={languageData} />
      <Table dataSource={languageData} loading={!loading} size="small" rowKey="id">
        <Column title="Id" dataIndex="id" key="id" align="center" width={100} />
        <Column title="LanguageId" dataIndex="languageId" key="languageId" align="center" />
        <Column title="Language" dataIndex="language" key="language" align="center" />
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
      </> : null}
      </>
  );
}

export default TitleLanguages;
