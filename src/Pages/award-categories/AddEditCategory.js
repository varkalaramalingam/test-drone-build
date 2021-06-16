import { Button, Form, Input, message, Modal, Select, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../api/io";
import { onlyAlphabetsareallowed } from "../../components/reusable/validations/Regex";

function AddEditAwards({ isAdd, initialData, getCategoriesData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/category/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ response }) => {
        message.success(
          `Successfully ${isAdd ? "Added" : "updated"} Category`
        );
        closeModal();
        getCategoriesData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object({
    categoryname: yup.string().required("required")
                      .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
   category_type: yup.string().required("required")
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={showModal}
      >
        {isAdd ? "Add Category" : "Edit"}
      </Button>
      <Modal
        title={`${isAdd ? `Add` : `Edit`} Category`}
        visible={isModalVisible}
        onOk={onSubmit}
        onCancel={closeModal}
        footer={false}
        okText="Submit"
        width={400}
        destroyOnClose={true}
      >
        <Formik
          initialValues={{
            id: initialData?.id || "",
            categoryname: initialData?.categoryname || "",
            category_type : initialData?.category_type || undefined
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Category Name" required>
                <Input
                  placeholder="Enter category name"
                  name="categoryname"
                  value={values.categoryname}
                  onChange={handleChange}
                  className={
                    "form-control" +
                    (errors.categoryname && touched.categoryname
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="categoryname" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Category Type" required>
                <Select
                  placeholder="Select category type"
                  name="category_type"
                  allowClear
                  value={values.category_type}
                  onChange={(e) => setFieldValue("category_type", e)}
                  className={
                    "form-control" +
                    (errors.category_type && touched.category_type
                      ? " is-invalid"
                      : "")
                  }
                >
                  <Select.Option key={1} value={1}>Title</Select.Option>
                  <Select.Option key={2} value={2}>People</Select.Option>
                  </Select>
                <ErrorMessage name="category_type" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Space>
                  <Button onClick={() => closeModal()}>Close</Button>
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

export default AddEditAwards;
