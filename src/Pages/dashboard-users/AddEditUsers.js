import { Col, Input, Row, Form, message,  Button, Divider, Space, Select } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../api/io";
import BackButton from "../../components/BackButton";
import { useHistory, useLocation } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

function AddUsers({getUserDetails }) {
  let location = useLocation();
  let history = useHistory();
  let isAdd = location.state.isAdd;
  let editUserRecord = location.state.record;

  const [ tenantData, setTenantData] = useState([]);

  const handleAddUser = (fields) => {
    io({ method: isAdd ? "post" : "patch", url: `/api/user/details/${!isAdd ? editUserRecord.userDetailsId : ""}`, data: fields })
      .then((response) => {
        message.success(`Account ${isAdd ? 'Added' : 'updated'} Successfully`)
        history.push("/dashboard-accounts")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    io({ method: "get", url: '/api/tenant' })
      .then(({data}) => {
        setTenantData(data.resultsMap.result)
      })
      .catch((error) => {
        console.log(error);
      });
}, [])

  
  const validationSchema = yup.object({
    fname: yup.string().required("required"),
    lname: yup.string().required("required"),
    address: yup.string().required("required"),
    contactnumber: yup.string().required("required"),
    emailid: yup.string().required("required"),
    tenantId: yup.string().required("required"),
  });

  return (
    <>
      <BackButton pageName={isAdd ? "Add Account" : "Edit Account"}/>
      <Formik 
      initialValues={{
              fname: editUserRecord?.fname || "",
              lname: editUserRecord?.lname || "",
              address: editUserRecord?.address || "",
              contactnumber: editUserRecord?.contactnumber || "",
              emailid: editUserRecord?.emailid || "",
              modifiedOn: editUserRecord?.modifiedOn || 0,
              createdOn: editUserRecord?.createdOn || 0,
              tenantId: editUserRecord?.tenantId || undefined,
         }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
              handleAddUser(fields);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              className="content-edit"
            >
              <Row>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Form.Item label="First Name" htmlFor="fname" required>
                    <Input name="fname" type="text" value={values.fname} onChange={handleChange} onBlur={handleBlur}
                      className={
                        "form-control" +
                        (errors.fname && touched.fname
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Enter First Name"
                    />
                    <ErrorMessage name="fname" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" htmlFor="lname" required>
                    <Input name="lname" type="text" value={values.lname} onChange={handleChange} onBlur={handleBlur}
                      className={
                        "form-control" +
                        (errors.lname && touched.lname
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Enter Last Name"
                    />
                    <ErrorMessage name="lname" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Form.Item label="Address" htmlFor="address" required>
                    <Input name="address" type="text" value={values.address} onChange={handleChange} onBlur={handleBlur}
                      className={
                        "form-control" +
                        (errors.address && touched.address
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Enter Address"
                    />
                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Contact Number" htmlFor="contactnumber" required>
                    <Input name="contactnumber" type="number" value={values.contactnumber} onChange={handleChange} onBlur={handleBlur}
                      className={
                        "form-control" +
                        (errors.contactnumber && touched.contactnumber
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Enter Contact Number"
                    />
                    <ErrorMessage name="contactnumber" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingRight: "5px" }}>
                  <Form.Item label="Email Id" htmlFor="emailid" required>
                    <Input name="emailid" type="text" value={values.emailid} onChange={handleChange} onBlur={handleBlur}
                      className={
                        "form-control" +
                        (errors.emailid && touched.emailid
                          ? " is-invalid"
                          : "")
                      }
                      placeholder="Enter Email Id"
                    />
                    <ErrorMessage name="emailid" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Tenant">
                <Select
                  placeholder="Select tenant "
                  showSearch
                  optionFilterProp="children"
                  name="tenantId"
                  value={values.tenantId}
                  allowClear
                  onChange={(value) => setFieldValue("tenantId", value)}
                  className={
                    "form-control" +
                    (errors.tenantId && touched.tenantId ? " is-invalid" : "")
                  }
                >
                  {tenantData?.map(({id, tenantName}) => (
                    <Select.Option value={id}>{tenantName}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="tenantId" component="div" className="invalid-feedback" />
              </Form.Item>
                </Col>
              </Row>
              <Divider span={24} />
              <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={() => history.push("/dashboard-accounts")}>Close</Button>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Space>
            </Form.Item>
            </Form>
          )}
        </Formik>
    </>
  );
}

export default AddUsers;
