import { Button, Col, Form, Input, message, Modal, Row, Space, Select } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditTenantConfig({ isAdd, initialData, getTenantConfigData, tenantId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/tenant/config/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ response }) => {
        message.success(
          `Successfully ${isAdd ? "Added" : "updated"} TenantConfig`
        );
        closeModal();
        getTenantConfigData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object({
    topicGroup: yup.string().required("required"),
    topicName: yup.string().required("required"),
    index_name: yup.string().required("required"),
    active: yup.string().required("required"),
  });
  
  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={showModal}
      >
        {isAdd ? "Add Tenant Config" : "Edit"}
      </Button>
      <Modal
        title={`${isAdd ? `Add` : `Edit`} Tenant Config`}
        visible={isModalVisible}
        onOk={onSubmit}
        onCancel={closeModal}
        footer={false}
        okText="Submit"
        width={600}
        destroyOnClose={true}
      >
        <Formik
         initialValues={{
          tenantId: initialData?.tenantCode || tenantId,
          createdBy: initialData?.createdBy || "system",
          modifiedBy: initialData?.modifiedBy || "",
          topicGroup: initialData?.topicGroup || "",
          topicName: initialData?.topicName || "", 
          dbPassword: initialData?.dbPassword || "",
          dbUsername: initialData?.dbUsername || "",
          index_name: initialData?.index_name || "",   
          elk_username: initialData?.elk_username || "",   
          elk_password: initialData?.elk_password || "",   
          elk_url: initialData?.elk_url || "",
          active: initialData?.active === 0 ? "Disable" : null || 1,   
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue}) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Row gutter={10}>
                <Col span={12}>
                <Form.Item label="Index Name" style={{ marginRight: "5px" }} required>
                        <Input
                           placeholder="Enter index name" 
                           name="index_name" 
                           value={values.index_name}
                           allowClear 
                           onChange={handleChange}  
                           className={"form-control" + (errors.index_name && touched.index_name ? " is-invalid" : "")}
                           />
                        <ErrorMessage name="index_name" component="div" className="invalid-feedback" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Active" required>
                        <Select 
                          name="active" 
                          allowClear
                          placeholder="Select active" 
                          value={values.active}  
                          onChange={(event) => setFieldValue("active", event)}
                          className={"form-control" + (errors.active && touched.active ? " is-invalid" : "")}
                          >
                            <Select.Option value={1} key={1}>Enable</Select.Option>
                            <Select.Option value={0} key={0}>Disable</Select.Option>
                        </Select>
                        <ErrorMessage name="active" component="div" className="invalid-feedback" />
                    </Form.Item>
                </Col>
              </Row>
             <Row gutter={5}>
               <Col span={12}> 
                 <Form.Item label="Topic Group" style={{ marginRight: "5px" }} required>
                      <Input
                         placeholder="Enter topic group" 
                         name="topicGroup" 
                         value={values.topicGroup}
                         allowClear 
                         onChange={handleChange}  
                         className={"form-control" + (errors.topicGroup && touched.topicGroup ? " is-invalid" : "")}
                         />
                      <ErrorMessage name="topicGroup" component="div" className="invalid-feedback" />
                  </Form.Item>
               </Col>
               <Col span={12}> 
                  <Form.Item label="Topic Name" style={{ marginRight: "5px" }} required>
                      <Input
                         placeholder="Enter topic name" 
                         name="topicName" 
                         value={values.topicName}
                         allowClear 
                         onChange={handleChange}  
                         className={"form-control" + (errors.topicName && touched.topicName ? " is-invalid" : "")}
                         />
                      <ErrorMessage name="topicName" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
                </Row>
              <Row gutter={5}>
                <Col span={12}> 
                  <Form.Item label="DB UserName" style={{ marginRight: "5px" }}>
                        <Input
                           placeholder="Enter db user name" 
                           name="dbUsername" 
                           value={values.dbUsername}
                           allowClear 
                           onChange={handleChange}  
                           className={"form-control" + (errors.dbUsername && touched.dbUsername ? " is-invalid" : "")}
                           />
                        <ErrorMessage name="dbUsername" component="div" className="invalid-feedback" />
                  </Form.Item>
                 </Col>
                 <Col span={12}> 
                    <Form.Item label="DB Password" style={{ marginRight: "5px" }}>
                        <Input
                           placeholder="Enter db password" 
                           name="dbPassword" 
                           value={values.dbPassword}
                           allowClear 
                           onChange={handleChange}  
                           className={"form-control" + (errors.dbPassword && touched.dbPassword ? " is-invalid" : "")}
                           />
                        <ErrorMessage name="dbPassword" component="div" className="invalid-feedback" />
                    </Form.Item>
                  </Col>
                  </Row>
                <Row gutter={5}>
                  <Col span={8}> 
                    <Form.Item label="ELK UserName" style={{ marginRight: "5px" }}>
                        <Input
                           placeholder="Enter elk user name" 
                           name="elk_username" 
                           value={values.elk_username}
                           allowClear 
                           onChange={handleChange}  
                           className={"form-control" + (errors.elk_username && touched.elk_username ? " is-invalid" : "")}
                           />
                        <ErrorMessage name="elk_username" component="div" className="invalid-feedback" />
                    </Form.Item>
                    </Col>
                  <Col span={8}> 
                    <Form.Item label="ELK Password" style={{ marginRight: "5px" }}>
                        <Input
                           placeholder="Enter elk password" 
                           name="elk_password" 
                           value={values.elk_password}
                           allowClear 
                           onChange={handleChange}  
                           className={"form-control" + (errors.elk_password && touched.elk_password ? " is-invalid" : "")}
                           />
                        <ErrorMessage name="elk_password" component="div" className="invalid-feedback" />
                    </Form.Item>
                    </Col>
                    <Col span={8}> 
                    <Form.Item label="ELK Url" style={{ marginRight: "5px" }}>
                        <Input
                           placeholder="Enter elk url" 
                           name="elk_url" 
                           value={values.elk_url}
                           allowClear 
                           onChange={handleChange}  
                           className={"form-control" + (errors.elk_url && touched.elk_url ? " is-invalid" : "")}
                           />
                        <ErrorMessage name="elk_url" component="div" className="invalid-feedback" />
                    </Form.Item>
                    </Col>
                </Row>
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

export default AddEditTenantConfig;
