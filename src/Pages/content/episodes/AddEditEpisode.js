import { Input, Form, Button, message, Space, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditSeason({ initialData, isAdd, getEpisodesData, titleId, metaTitleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [seasonsData, setSeasonsData] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/${titleId}/episodes/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then((response) => {
        message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
        getEpisodesData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const getSeasonData = () => {
    io({ method: "get", url: `/api/${titleId}/seasons` })
      .then(({ data = [] } = {}) => {
        setSeasonsData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  const validationSchema = yup.object({
    seasonsId: yup.string().required("required"),
    episode_No: yup.string().required("required"),
  });

  const onModelClick = () => {
    showModal();
    getSeasonData();
  }

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={onModelClick}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Add Episode" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Episode" : "Edit Episode"}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
        width={400}
      >
        <Formik
          initialValues={{
            titleId: initialData?.titleId || titleId,
            episode_No: initialData?.episode_No || "",
            episode_titleId: initialData?.episode_titleId || metaTitleId,
            seasonsId: initialData?.seasonsId || undefined,
            modifiedBy: initialData?.modifiedBy || "",
            createdBy: initialData?.createdBy || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
            <Form
              layout="vertical"
              onFinish={() => handleSubmit()}
              onBlur={handleBlur}
            >
              <Form.Item label="Episode Number" required>
                <Input
                  placeholder="Enter episode number"
                  name="episode_No"
                  type="number"
                  min={0}
                  value={values.episode_No}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.episode_No && touched.episode_No ? " is-invalid" : "")
                  }
                />
                <ErrorMessage name="episode_No" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Season" required>
                <Select
                  placeholder="Select season"
                  name="seasonsId"
                  allowClear
                  value={values.seasonsId}
                  onChange={(e) => setFieldValue("seasonsId", e)}
                  className={
                    "form-control" +
                    (errors.seasonsId && touched.seasonsId
                      ? " is-invalid"
                      : "")
                  }
                >
                  {seasonsData?.map((item) => (
                  <Select.Option value={item.id} key={item.id}>{item.seasons_name}</Select.Option>
                  ))}
                  </Select>
                <ErrorMessage name="seasonsId" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }} required>
                <Space>
                  <Button onClick={() => handleCancel()}>Close</Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Space>
              </Form.Item> 
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default AddEditSeason;
