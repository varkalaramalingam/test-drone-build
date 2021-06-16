import { Col, Form, Input, message, Row, Space, Button } from "antd";
import React from "react";
import { io } from "../../../api/io";
import BackButton from "../../../components/BackButton";
import { useHistory } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { onlyAlphabetsareallowed } from "../../../components/reusable/validations/Regex";

function AddEditPlot() {
  let history = useHistory();
  let isAdd = history.location.state.isAdd;
  let initialData = history.location.state.record;

  const onSubmit = (fields) => {
    io({
      method: isAdd ? "post" : "put",
      url: `/api/mastermeta/${isAdd ? initialData : initialData.id}/plot/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ data } = {}) => {
        if (data.success) {
          message.success(data.message);
          history.goBack();
        } else {
          message.error(data.errors[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object({
    source: yup.string()
                .required("required")
                .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
    plottext: yup.string().required("required"),
    summary: yup.string().required("required"),
  });

  return (
    <>
      <BackButton pageName={isAdd ? "Add Plot" : "Edit Plot"} />
      <Formik
        initialValues={{
          titleid: initialData?.titleid || initialData,
          source: initialData?.source || "",
          plottext: initialData?.totalPlottext || "",
          summary: initialData?.totalSummary || "",
          modifiedBy: initialData?.modifiedBy || "",
          modifiedDate: initialData?.modifiedDate || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(fields) => {
          onSubmit(fields);
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
          <Form
            layout="vertical"
            className="content-edit"
            onFinish={() => handleSubmit()}
            onBlur={handleBlur}
          >
            <Row>
              <Col span={24}>
                <Form.Item label="Source">
                  <Input
                    placeholder="Enter Source"
                    name="source"
                    value={values.source}
                    onChange={(e) => handleChange(e)}
                    className={
                      "form-control" +
                      (errors.source && touched.source ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="source"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Plot Text">
              <Input.TextArea
                rows={4}
                placeholder="Enter Plot Text"
                name="plottext"
                value={values.plottext}
                onChange={(e) => setFieldValue("plottext", e.target.value)}
                className={
                  "form-control" +
                  (errors.plottext && touched.plottext ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="plottext"
                component="div"
                className="invalid-feedback"
              />
            </Form.Item>
            <Form.Item label="Summary">
              <Input.TextArea
                rows={4}
                placeholder="Enter Summary"
                name="summary"
                value={values.summary}
                onChange={(e) => setFieldValue("summary", e.target.value)}
                className={
                  "form-control" +
                  (errors.summary && touched.summary ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="summary"
                component="div"
                className="invalid-feedback"
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={() => history.goBack()}>Close</Button>
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

export default AddEditPlot;
