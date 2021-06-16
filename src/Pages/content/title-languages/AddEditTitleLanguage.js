import { Button, Form, message, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";

function AddEditTitleLanguage({ isAdd, initialData, titleId, getLanguageList, existingLanguages }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [languageData, setLanguageData] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const [inputText, setInputText] = useState({
    createdOn: 0,
    languageId: [],
    titleId: titleId,
  });


    const onSubmit = () => {
    io({
      method: "post",
      url: `/api/mastermeta/${titleId}/language`,
      data: inputText,
    })
      .then(({ response }) => {
        message.success(
          `Successfully Added updated title genre`
        );
        closeModal();
        getLanguageList();
        getLangList();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };
 
  useEffect(() => { getLangList()  }, []);
  const getLangList =() => {
    io({ method: "get", url: "/api/language" })
      .then(({ data = [] } = {}) => {
        filterData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  const filterData = (genreData) => {
    const filter = genreData?.filter((item) => {
      for(let i=0; i<existingLanguages.length; i++ ) {
          if (existingLanguages[i].languageId === item.id) {
              return false;          
          }}
          return true;
    }) 
    setLanguageData(filter);
  }
  
  const columns = [
    {
      title: "Language Name",
      dataIndex: "language",
      key: "language",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setInputText({ ...inputText, languageId: selectedRowKeys });
    },
  };

  return (
    <>
      <Button
        type="primary"
        style={{ float: "right", marginBottom: "10px" }}
        onClick={showModal}
      >
        Add Title Language
      </Button>
      <Modal
        title="Add Title Language"
        visible={isModalVisible}
        onOk={onSubmit}
        onCancel={closeModal}
        footer={false}
        okText="Submit"
        width={400}
        destroyOnClose={true}
      >
        <Form layout="vertical" onFinish={onSubmit}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={languageData}
            rowKey={(record) => record.id}
            pagination={false}
            size="small"
            scroll={{ y: 240 }}
          />
          <Form.Item style={{ textAlign: "right", paddingTop: "10px" }}>
            <Space>
              <Button onClick={() => closeModal()}>Close</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddEditTitleLanguage;
