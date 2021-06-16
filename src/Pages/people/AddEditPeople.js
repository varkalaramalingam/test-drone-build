import { Col, Input, Row, Form, message, Select, Space, Button } from "antd";
import React, { useEffect, useState } from "react";
import { io } from "../../api/io";
import BackButton from "../../components/BackButton";
import { useHistory, useLocation } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

function AddEditPeople({match}) {
  let history = useHistory();
  let location = useLocation();
  let isAdd = location.state.isAdd;
  let initialData = location.state.record;

  const [roleData, setRoleData] = useState([]);
  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/people/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ data = [] } = {}) => {
        history.push("/people");
        message.success(`Successfully ${isAdd ? "added" : "updated"} people`);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  useEffect(() => {
    io({ method: "get", url: `/api/role` })
      .then(({ data }) => {
        setRoleData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const validationSchema = yup.object({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    primaryroleid: yup.string().required("required"),
    mediatitle: yup.string().required("required"),
  });

 
  return (
    <>
      <BackButton pageName={isAdd ? "Add People" : "Edit People"} />
      <Formik
        initialValues={{
          primaryroleid: initialData?.primaryroleid || undefined,
          firstname: initialData?.firstname || "",
          lastname: initialData?.lastname || "",
          email: initialData?.email || "",
          age: initialData?.age || "",
          mediatitle: initialData?.mediatitle || "",
          summary: initialData?.summary || "",
          maritalstatus: initialData?.maritalstatus || "",
          introduced_year: initialData?.introduced_year || "",
          fatherid: initialData?.fatherid || "",
          motherid: initialData?.motherid || "",
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
          <Form
            layout="vertical"
            className="content-edit"
            onFinish={handleSubmit}
            onBlur={handleBlur}
          >
            <Row>
              <Col span={12} style={{ paddingRight: "10px" }}>
                <Form.Item label="First Name" htmlFor="firstname" required>
                  <Input
                    placeholder="Enter First Name"
                    name="firstname"
                    value={values.firstname}
                    onChange={(e) => handleChange(e)}
                    className={
                      "form-control" +
                      (errors.firstname && touched.firstname
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" required>
                  <Input
                    placeholder="Enter Last Name"
                    name="lastname"
                    value={values.lastname}
                    onChange={(e) => handleChange(e)}
                    className={
                      "form-control" +
                      (errors.lastname && touched.lastname ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ paddingRight: "10px" }}>
                <Form.Item label="Age">
                  <Input
                    placeholder="Enter Age"
                    type="number"
                    name="age"
                    value={values.age}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email">
                  <Input
                    placeholder="Enter Email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ paddingRight: "10px" }}>
                <Form.Item label="Marital Status">
                  <Input
                    placeholder="Enter Marital Status"
                    name="maritalstatus"
                    value={values.maritalstatus}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Introduced Year">
                  <Input
                    placeholder="Enter Year Of Marriage"
                    name="introduced_year"
                    value={values.introduced_year}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ paddingRight: "10px" }}>
                <Form.Item label="Media Title" htmlFor="mediatitle" required>
                  <Input
                    placeholder="Enter media title"
                    name="mediatitle"
                    value={values.mediatitle}
                    onChange={(e) => handleChange(e)}
                    className={
                      "form-control" +
                      (errors.mediatitle && touched.mediatitle
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="mediatitle"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Primary Role"
                  htmlFor="primaryroleid"
                  required
                >
                  <Select
                    name="primaryroleid"
                    allowClear
                    value={values.primaryroleid}
                    placeholder="Select Role"
                    onChange={(value) => setFieldValue("primaryroleid", value)}
                    className={
                      "form-control" +
                      (errors.primaryroleid && touched.primaryroleid
                        ? " is-invalid"
                        : "")
                    }
                  >
                    {roleData?.map(({ id, rolename }) => (
                      <Select.Option key={id} value={id}>
                        {rolename}
                      </Select.Option>
                    ))}
                  </Select>
                  <ErrorMessage
                    name="primaryroleid"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Summary">
              <Input.TextArea
                placeholder="Enter Summary"
                name="summary"
                value={values.summary}
                rows={4}
                showCount
                maxLength={100}
                onChange={(e) => setFieldValue("summary", e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={() => history.push("/people")}>Close</Button>
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

export default AddEditPeople;
