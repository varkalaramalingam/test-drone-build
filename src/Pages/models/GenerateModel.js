import { Input, Form, Button, message, Space, Select, Checkbox, Row, Col, Divider } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { io } from "../../api/io";
import * as yup from "yup";

function GenerateModel({ isAdd, getModelsData }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ tenantData, setTenantData] = useState([]);
  const [ tenantName, setTenantName] = useState([]);
  const [ tableName, setTableName] = useState([]);


  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (fields) => {
    io({
      method: isAdd ? "post" : "patch",
      url: `/api/contelligenz/unified/model?tables=${tableName}&tenant=${tenantName}`,
      data: fields,
    })
      .then((response) => {
        message.success(`Model ${isAdd ? "Added" : "Updated"} Successfully`);
        closeModal();
        getModelsData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };
 
    const getTenantsData = () => {
    io({ method: "get", url: '/api/tenant' })
      .then(({data}) => {
        setTenantData(data.resultsMap.result)
      })
      .catch((error) => {
        console.log(error);
      });
    }

  const validationSchema = yup.object({
    tenant: yup.string().required("required"),
    table: yup.string().required("required"),
  });

  const onModelClick = () => {
    getTenantsData();
    showModal();
  }

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={onModelClick}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Generate Model" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Generate Model" : "Edit Model"}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
        width={600}
      >
        <Formik
          initialValues={{
            tenant: undefined,
            table: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange,  values, errors, touched, setFieldValue }) => (
            <Form
              layout="vertical"
              onFinish={() => onSubmit()}
            >
              <Row span={24}>
                <Col span={10} style={{ paddingRight: "20px" }}>
              <Form.Item label="Name">
                <Input
                  placeholder="Enter name "
                  name="rolename"
                  value={values.rolename}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.rolename && touched.rolename ? " is-invalid" : "")
                  }
                />
                <ErrorMessage name="rolename" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Version">
                <Input
                  placeholder="Enter version"
                  name="roledetails"
                  value={values.roledetails}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.roledetails && touched.roledetails
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="roledetails" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Tenant" required>
                <Select
                  placeholder="Select tenant "
                  showSearch
                  optionFilterProp="children"
                  name="tenantId"
                  value={values.tenant}
                  allowClear
                  onChange={(value) =>{ 
                    setTenantName(value);
                    setFieldValue("tenant", value)}}
                  className={
                    "form-control" +
                    (errors.tenantId && touched.tenantId ? " is-invalid" : "")
                  }
                >
                  {tenantData?.map(({id, tenantName}) => (
                    <Select.Option value={tenantName}>{tenantName}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="tenantId" component="div" className="invalid-feedback" />
              </Form.Item>
              </Col>
              <Col span={2}>
              <Divider type="vertical" style={{ height: "300px" }}  />
              </Col>
              <Col span={10}>
              <Form.Item label="Table" required>
              <div style={{minHeight:"auto", maxHeight:"240px", overflowY:"auto", paddingLeft:"10px"}}> 
              <Checkbox.Group style={{ width: '100%' }} onChange={(value) => setTableName(value)}>
              <Space size="small" direction="vertical">
              <Row span={24}><Checkbox value="basicInfo">Include Basic Title Info</Checkbox></Row>
              <Row span={24}><Checkbox value="regions">Include Regions</Checkbox></Row>
              <Row span={24}><Checkbox value="genres">Include Genres</Checkbox></Row>
              <Row span={24}><Checkbox value="subgenre">Include subgenre</Checkbox></Row>
              <Row span={24}><Checkbox value="language">Include Language</Checkbox></Row>
              <Row span={24}><Checkbox value="keywords">Include Keywords</Checkbox></Row>
              <Row span={24}><Checkbox value="plot">Extract Keyword from plot</Checkbox></Row>
              <Row span={24}><Checkbox value="crew-cast">Include Cast and Crew</Checkbox></Row>
              <Row span={24}><Checkbox value="title-attribures">Include Title Attributes</Checkbox></Row>
              <Row span={24}><Checkbox value="seasons">Include Seasons</Checkbox></Row>
              <Row span={24}><Checkbox value="reviews">Include Reviews</Checkbox></Row>
              <Row span={24}><Checkbox value="related_titles">Include Related Title</Checkbox></Row>
              <Row span={24}><Checkbox value="title-ratings">Include Title Ratings</Checkbox></Row>
              <Row span={24}><Checkbox value="title-awards">Include Title Awards</Checkbox></Row>
              <Row span={24}><Checkbox value="title-people-awards">Include Title PeopleAwards</Checkbox></Row>
              </Space>
              </Checkbox.Group>
              </div>
              </Form.Item>
              </Col>
              </Row>
              <Form.Item style={{ textAlign: "right" }} required>
                <Space>
                  <Button onClick={() => handleCancel()}>Close</Button>
                  <Button type="primary" htmlType="submit">Generate</Button>
                </Space>
              </Form.Item> 
             
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default GenerateModel;
