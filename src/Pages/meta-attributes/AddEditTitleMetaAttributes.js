import React, { useState } from "react";
import { Form, Button, Input, message, Select, Space, Row, Col } from "antd";
import Modal from "antd/lib/modal/Modal";
import { io } from "../../api/io";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

function AddEditTitleMetaAttributes({ initialData, isAdd, getMetaAttributeData }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const closeModel = () => setIsModalVisible(false);


  const onSubmit = (Fields) => {
    let capitalizedText = Fields.name.charAt(0).toUpperCase() + Fields.name.slice(1);
    io({
      method: isAdd ? "post" : "put",
      url: `/api/mastermeta/attributes/${!isAdd ? initialData.id : ""}`,
      data: {...Fields, name : capitalizedText},
    })
      .then((response) => {
        message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
        getMetaAttributeData();
        closeModel();
      })
      .catch((error) => {
        console.error();
        message.error(error.message);
      });
  };

  const validationSchema = yup.object({
    name: yup.string().required("required"),
    dataType: yup.string().required("required"),
    dataValue: yup.string().required("required"),
    active: yup.string().required("required"),
  });

  return (
    <>
      <Button type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Add Attribute" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Attribute" : "Edit Attribute"}
        visible={isModalVisible}
        onOk={showModal}
        onCancel={closeModel}
        footer={null}
        width={400}
        destroyOnClose={true}
      >
        <Formik
          initialValues={{
            id: initialData?.id || "",
            name: initialData?.name || "",
            dataValue: initialData?.dataValue || undefined,
            dataType: initialData?.dataType || undefined,
            active:initialData?.active || 1
          }}
          validationSchema={validationSchema}
          onSubmit={(Fields) => {
            onSubmit(Fields);
          }}
        >
          {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
            <Form layout="vertical" onFinish={() => handleSubmit()}>
              <Form.Item
                label="Name"
              >
                <Input
                  placeholder="Enter Name"
                  name="name"
                  value={values.name}
                  onChange={(e) => handleChange(e)}
                  className={ "form-control" + (errors.name && touched.name? " is-invalid" : "")}
                />
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </Form.Item>
              <Row span={24} gutter={10}>
                <Col span={12}>
              <Form.Item label="Attribute Value">
                <Select
                  placeholder="Enter Value"
                  name="dataValue"
                  value={values.dataValue}
                  onChange={(value) => setFieldValue("dataValue", value)}
                  allowClear
                  className={ "form-control" + (errors.dataValue && touched.dataValue? " is-invalid" : "")}
                >
                  <Select.Option value="single" key="1">Single</Select.Option>
                  <Select.Option value="multiple" key="2">multiple</Select.Option>
                </Select>
                <ErrorMessage name="dataValue" component="div" className="invalid-feedback" />
              </Form.Item>
              </Col>
                <Col span={12}>
              <Form.Item label="Data Type">
                <Select
                  placeholder="Enter Data Type"
                  name="dataType"
                  value={values.dataType}
                  onChange={(value) => setFieldValue("dataType", value)}
                  allowClear
                  className={ "form-control" + (errors.dataType && touched.dataType? " is-invalid" : "")}
                >
                  <Select.Option value="number" key="1" >Number</Select.Option>
                  <Select.Option value="text" key="2" >Text</Select.Option>
                </Select>
                <ErrorMessage name="dataType" component="div" className="invalid-feedback" />
              </Form.Item>
              </Col>
              </Row>
              <Form.Item label="Active" required>
              <Select 
                 name="active"
                 placeholder="Select isActive"
                 value={values.active} 
                 onChange={(value) =>setFieldValue ("active",value)}
                  className={ "form-control" + (errors.active && touched.active? " is-invalid" : "")}
                  allowClear >
                   <Select.Option value={1} key={1}>Enable</Select.Option>
                   <Select.Option value={0} key={0}>Disable</Select.Option>
                 </Select>
                 <ErrorMessage name="active" component="div" className="invalid-feedback" />
            </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Space>
                  <Button onClick={() => closeModel()}>Close</Button>
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

export default AddEditTitleMetaAttributes;