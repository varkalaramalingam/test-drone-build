import { Input, Form, Button, message, Space, Col, Row, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditBoxOffice({ initialData, isAdd, getBoxOfficeData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/mastermeta/${titleId}/titleBoxOffice/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then((response) => {
        message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
        getBoxOfficeData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };


  const validationSchema = yup.object({
    boxoffice_text: yup.string().required("required"),
    budget: yup.string().required("required"),
    hit: yup.string().required("required"),
    revenue: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Add Box Office" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Box Office" : "Edit Box Office"}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
        width={400}
      >
        <Formik
          initialValues={{
            boxoffice_text: initialData?.boxoffice_text || "",
            budget: initialData?.budget || "",
            createdBy: initialData?.createdBy || "",
            hit: initialData?.hit || undefined,
            modifiedBy: initialData?.modifiedBy || "",
            revenue: initialData?.revenue || "",
            titleId: initialData?.titleId || titleId
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
                 <Row gutter={10}>
                    <Col span={12}>
                    <Form.Item label="Budget" required>
                        <Input
                        placeholder="Enter budget "
                        name="budget"
                        type="number"
                        min={1000000}
                        value={values.budget}
                        onChange={(e) => handleChange(e)}
                        className={
                            "form-control" +
                            (errors.budget && touched.budget ? " is-invalid" : "")
                        }
                        />
                        <ErrorMessage name="budget" component="div" className="invalid-feedback" />
                    </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item label="revenue" required>
                        <Input
                        placeholder="Enter revenue"
                        name="revenue"
                        type="number"
                        min={1000000}
                        value={values.revenue}
                        onChange={handleChange}
                        className={
                            "form-control" +
                            (errors.revenue && touched.revenue ? " is-invalid" : "")
                        }
                        />
                        <ErrorMessage name="revenue" component="div" className="invalid-feedback" />
                    </Form.Item>
                    </Col>
                </Row>              
              <Form.Item label="Hit" required>
                <Select
                  placeholder="Select hit"
                  name="hit"
                  allowClear
                  value={values.hit}
                  onChange={(item) => setFieldValue("hit", item)}
                  className={
                    "form-control" +
                    (errors.hit && touched.hit
                      ? " is-invalid"
                      : "")
                  }
                >
                    <Select.Option key={0} value={0}>Flop</Select.Option>
                    <Select.Option key={1} value={1}>Below Average</Select.Option>
                    <Select.Option key={2} value={2}>Average</Select.Option>
                    <Select.Option key={3} value={3}>Hit</Select.Option>
                    <Select.Option key={4} value={4 }>Blockbuster</Select.Option>
                </Select>
                <ErrorMessage name="hit" component="div" className="invalid-feedback" />
              </Form.Item>
                 <Form.Item label="Boxoffice Text" required>
                <Input.TextArea
                  placeholder="Enter boxoffice text"
                  name="boxoffice_text"
                  value={values.boxoffice_text}
                  onChange={(e) => setFieldValue("boxoffice_text", e.target.value)}
                  className={
                    "form-control" +
                    (errors.boxoffice_text && touched.boxoffice_text
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="boxoffice_text" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }} required>
                <Space>
                  <Button onClick={handleCancel}>Close</Button>
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

export default AddEditBoxOffice;
