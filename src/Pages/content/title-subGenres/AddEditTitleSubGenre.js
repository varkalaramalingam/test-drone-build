import { Button, Form, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";

function AddEditTitleSubGenre({ titleId, isAdd, initialData, existingSubGenres, getGenreList }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subgenreData, setSubGenreData] = useState([]);
  const [inputText, setInputText] = useState({
    createdon: 0,
    subgenreId: [initialData?.id],
    titleId: titleId,
  });

  const showModal = () =>{
     setIsModalVisible(true);
    }
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    io({ method: "get", url: "/api/subgenre/active" })
      .then(({ data = [] } = {}) => {
        setSubGenreData(data.resultsMap.result);
        filterData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

 
  const onSubmit = () => {
    io({
      method: isAdd ? "post" : "patch",
      url: `/api/mastermeta/${titleId}/subgenre${
        !isAdd ? initialData?.id : ""
      }`,
      data: inputText,
    })
      .then(({ data }) => {
        message.success("Successfully added title genre");
        getGenreList();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const columns = [
    {
      title: "Sub Genre Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const filterData = (genreData) => {
    const filter = genreData.filter((item) => {
      for(let i=0; i<existingSubGenres.length; i++ ) {
          if (existingSubGenres[i].subgenreId === item.id) {
              return false;          
          }}
          return true;
    }) 
    setSubGenreData(filter);
  }

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setInputText({ ...inputText, subgenreId: selectedRowKeys });
    }
  };

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={showModal}
      >
        {isAdd ? "Add Title Genre" : "Edit"}
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
            dataSource={subgenreData}
            rowKey="id"
            pagination={false}
            size="small"
          />
        </Form>
      </Modal>
    </>
  );
}

export default AddEditTitleSubGenre;
