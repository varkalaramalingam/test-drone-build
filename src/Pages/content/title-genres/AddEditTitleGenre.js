import { Button, Form, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";

function AddTitleGenre({ titleId, isAdd, initialData, getGenreList, existingGenres }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [genreData, setGenreData] = useState([]);
  const [inputText, setInputText] = useState({
    createdon: 0,
    genreId: [initialData?.id],
    titleId: titleId,
  });
  
  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    io({ method: "get", url: "/api/genre/active" })
      .then(({ data = [] } = {}) => {
        filterData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

const filterData = (genreData) => {
  const filter = genreData.filter((item) => {
    for(let i=0; i<existingGenres.length; i++ ) {
        if (existingGenres[i].genreId === item.id) {
            return false;          
        }}
        return true;
  }) 
  setGenreData(filter);
}

  const onSubmit = () => {
    io({
      method: isAdd ? "post" : "patch",
      url: `/api/mastermeta/${titleId}/genre/${
        !isAdd ? initialData?.id : ""
      }`,
      data: inputText,
    })
      .then(({ data }) => {
        message.success("Successfully added title genre");
        closeModal();
        getGenreList();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const columns = [
    {
      title: "Genre Name",
      dataIndex: "name",
      key: "name",
    },
  ];
   
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setInputText({ ...inputText, genreId: selectedRowKeys });
    }
  };

  return (
    <>
      <Button
        type="primary"
        style={{ float:"right", marginBottom:"10px" }}
        onClick={showModal}
      >
        Add Title Genre
      </Button>
      <Modal
        title="Add Title Genre"
        visible={isModalVisible}
        onOk={onSubmit}
        onCancel={closeModal}
        okText="Save"
        cancelText="Close"
        width={400}
        destroyOnClose={true}
      >
        <Form layout="vertical" onFinish={onSubmit}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={genreData}
            rowKey={(record) => record.id}
            pagination={false}
            size="small"
            scroll={{ y: 240 }}
          />
        </Form>
      </Modal>
    </>
  );
}

export default AddTitleGenre;
