import React, { useEffect, useState } from "react";
import { io } from "../../api/io";
import BackButton from "../../components/BackButton";
import { Col, Input, Row, Form, message, Select, Divider, Space, Button } from "antd";
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

function AddEditTenantComponent(props){

    let history = useHistory();

    const { Option } = Select;

    let isAdd = props.history.location.state.isAdd;
    let initialData = props.history.location.state.record;

    
    const onSubmit = (fields) => {

        io({ method: "post", url:`/api/tenant/${ !isAdd ? initialData.id : ""}`, data:fields })
          .then(({ data = [] } = {}) => {
            message.success(`${ isAdd ? "Tenant Added Successfully" : "Tenant Updated Successfully" }`);
            history.push('/tenants');
          })
          .catch((error) =>{
            message.error(error.message)
        })
    }

    const validationSchema = yup.object({
        tenantCode: yup.string().required("required"),
        tenantName: yup.string().required("required"),
        email: yup.string().required("required"),
      });

      console.log(initialData);

    return(
        <>
        <BackButton pageName={isAdd ? "Add Tenant" : "Edit Tenant"} />
        <Divider />
        <Formik
        initialValues={{
            id: initialData?.id || "",
            tenantCode: initialData?.tenantCode || "",
            tenantName: initialData?.tenantName || "",
            tenantType: initialData?.tenantType || undefined,
            createdOn: initialData?.createdOn || undefined,
            modifiedOn: initialData?.modifiedOn || 0,
            contactNumber: initialData?.contactNumber || "",
            email: initialData?.email || "",
            address: initialData?.address || "",
            country: initialData?.country || "India",
            state: initialData?.state || "Telangana",
            city: initialData?.city || "Hyderabad",
            createdBy: initialData?.createdBy || "",
            active: initialData?.active || 1
        }}
        validationSchema={validationSchema}
        onSubmit={(fields) => {
          onSubmit(fields);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
        <Form layout="vertical" className="content-edit" onFinish={() => handleSubmit()}>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item label="Tenant Code" rules={[{ required: true, message: 'Please enter your tenant id!' }]}>
                        <Input placeholder="Enter Tenant Code" name="tenantCode" value={values.tenantCode} allowClear onChange={handleChange}  className={
                      "form-control" +
                      (errors.tenantCode && touched.tenantCode
                        ? " is-invalid"
                        : "")
                    }/>
                        <ErrorMessage
                    name="tenantCode"
                    component="div"
                    className="invalid-feedback"
                  />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Tenant Name" rules={[{ required: true, message: 'Please enter your tenant name!' }]}>
                        <Input placeholder="Name" name="tenantName" value={values.tenantName} allowClear onChange={handleChange}  className={
                      "form-control" +
                      (errors.tenantName && touched.tenantName
                        ? " is-invalid"
                        : "")
                    }/>
                        <ErrorMessage
                    name="tenantName"
                    component="div"
                    className="invalid-feedback"
                  />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item label="Contact Number" rules={[{ required: true, message: 'Please enter your contact number!' }]}>
                        <Input placeholder="Contact Number" type="number" name="contactNumber" value={values.contactNumber} allowClear onChange={handleChange} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Email" rules={[{ required: true, message: 'Please enter your tenant email!' }]}>
                        <Input placeholder="Email" type="email" name="email" value={values.email} allowClear onChange={handleChange} className={
                      "form-control" +
                      (errors.tenantId && touched.tenantId
                        ? " is-invalid"
                        : "")
                    }/>
                    <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item label="Address">
                        <Input placeholder="Address" name="address" value={values.address} allowClear onChange={handleChange} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Country" rules={[{ required: true, message: 'Please enter your Country!' }]}>
                        <Select name="country" value={values.country} onChange={(event) => setFieldValue("country", event)}>
                            <Option value="India">India</Option>
                            <Option value="Australia">Australia</Option>
                            <Option value="America">America</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item label="State" rules={[{ required: true, message: 'Please enter your State!' }]}>
                        <Select name="state" value={values.state} onChange={(event) => setFieldValue("state", event)}>
                            <Option value="Telangana">Telangana</Option>
                            <Option value="Karnataka">Karnataka</Option>
                            <Option value="Tamilnadu">Tamilnadu</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="City" rules={[{ required: true, message: 'Please enter your City!' }]}>
                        <Select name="city" value={values.city} onChange={(event) => setFieldValue("city", event)}>
                            <Option value="Hyderabad">Hyderabad</Option>
                            <Option value="Bangalore">Bangalore</Option>
                            <Option value="Chennai">Chennai</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item label="Tenant Type">
                        <Select placeholder="select tenant type" name="tenantType" value={values.tenantType}  onChange={(event) => setFieldValue("tenantType", event)}>
                            <Option value="movies">Movies</Option>
                            <Option value="news">News</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Active">
                        <Select name="active" value={values.active} disabled={ isAdd ? true : false } onChange={(event) => setFieldValue("active", event)}>
                            <Option value={1}>Enable</Option>
                            <Option value={0}>Disable</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={() => history.push("/tenants")}>Close</Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item> 
        </Form>
        )}
        </Formik>
        </>
        
    );
}

export default AddEditTenantComponent