import { Input, Form, Button, message, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditSeason({ initialData, isAdd, getSeasonData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/${titleId}/seasons/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then((response) => {
        message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
        getSeasonData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };


  const validationSchema = yup.object({
    seasons_name: yup.string().required("required"),
    seasons_no: yup.string().required("required"),
    seasons_discription: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Add Season" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Season" : "Edit Season"}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
        width={400}
      >
        <Formik
          initialValues={{
            seasons_discription: initialData?.seasons_discription || "",
            seasons_name: initialData?.seasons_name || "",
            seasons_no: initialData?.seasons_no || "",
            titleId: initialData?.titleId || titleId,
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
            <Form
              layout="vertical"
              onFinish={() => handleSubmit()}
              onBlur={handleBlur}
            >
              <Form.Item label="Season Name" required>
                <Input
                  placeholder="Enter season name "
                  name="seasons_name"
                  value={values.seasons_name}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.seasons_name && touched.seasons_name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage name="seasons_name" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Season Number" required>
                <Input
                  placeholder="Enter season number "
                  name="seasons_no"
                  type="number"
                  value={values.seasons_no}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.seasons_no && touched.seasons_no ? " is-invalid" : "")
                  }
                />
                <ErrorMessage name="seasons_no" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Seasons Description" required>
                <Input
                  placeholder="Enter seasons discription"
                  name="seasons_discription"
                  value={values.seasons_discription}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.seasons_discription && touched.seasons_discription
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="seasons_discription" component="div" className="invalid-feedback" />
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
