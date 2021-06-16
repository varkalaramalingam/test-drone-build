import { Button, Form, Modal, message, Input, Space, Row, Col } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { io } from "../../../api/io";
import * as yup from "yup";
import { onlyAlphabetsareallowed } from "../../../components/reusable/validations/Regex";

function AddEditTitleRatings({ titleId, isAdd, initialData, getRatingList }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [weightage, setWeightage] = useState();
  const [rating, setRating] = useState();
  const [normalizedRating, setNormalizedRating] = useState();

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    setNormalizedRating(fields.normalizedRating);
    fields.normalizedRating = rating / weightage;
    io({
      method: "post",
      url: `/api/mastermeta/title/ratings/${!isAdd ? initialData.id : ""}`,
      data: { ...fields, normalizedRating:   fields.rating / fields.weightage },
    })
      .then(({ data }) => {
        message.success(
          `Successfully ${isAdd ? "added" : "updated"} title rating`
        );
        closeModal();
        getRatingList();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object().shape({
    source: yup.string()
               .required("required")
               .matches(/^\S+$/, "space not allowed")
               .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
    rating: yup.string().required("required"),
    weightage: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={showModal}
      >
        {isAdd ? "Add Title Rating" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Title Rating" : "Edit Title Rating"}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={false}
        width={400}
        destroyOnClose={true}
      >
        <Formik
          initialValues={{
            normalizedRating: normalizedRating,
            createdBy: initialData?.createdBy || undefined,
            rating: initialData?.rating !== "0" ?  initialData?.rating : 0 || "",
            modifiedBy: initialData?.modifiedBy || "",
            modifiedOn: initialData?.modifiedOn || 0,
            createdOn: initialData?.createdOn || 0,
            source: initialData?.source || "",
            titleid: initialData?.titleid || titleId,
            weightage: initialData?.weightage !== "0" ? initialData?.weightage : 0 || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
            <Form layout="vertical" onFinish={() => handleSubmit()}>
              <Form.Item label="Source" required>
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter source name"
                  name="source"
                  value={values.source}
                  onBlur={handleBlur}
                  onChange={handleChange}
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
              <Row Span={24} gutter={10}>
                <Col span={12}>
                  <Form.Item label="Rating" required>
                    <Input
                      style={{ width: "100%" }}
                      type="number"
                      min="0"
                      max="10"
                      placeholder="Enter rating"
                      name="rating"
                      value={values.rating}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setRating(e.target.value);
                        setFieldValue("rating", e.target.value);
                      }}
                      className={
                        "form-control" +
                        (errors.rating && touched.rating ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="rating"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Weightage" required>
                    <Input
                      style={{ width: "100%" }}
                      type="number"
                      min="0"
                      max="10"
                      placeholder="Enter weightage"
                      name="weightage"
                      value={values.weightage || values.weightage}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setWeightage(e.target.value);
                        setFieldValue("weightage", e.target.value);
                      }}
                      className={
                        "form-control" +
                        (errors.weightage && touched.weightage
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="weightage"
                      component="div"
                      className="invalid-feedback"
                    />
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

export default AddEditTitleRatings;
