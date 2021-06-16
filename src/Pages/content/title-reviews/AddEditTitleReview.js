import { Button, Form, Modal, message, Input, Space, Row, Col } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { io } from "../../../api/io";
import * as yup from "yup";
import { onlyAlphabetsareallowed } from "../../../components/reusable/validations/Regex";

function AddEditTitleReview({ titleId, isAdd, initialData, getReviewsList}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    io({
      method: isAdd ? "post" : "patch",
        url: `/api/mastermeta/${titleId}/reviews/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ data }) => {
        message.success(`Successfully ${isAdd ? 'added' : 'updated'} title Review`);
        closeModal();
        getReviewsList();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object().shape({
    source: yup.string()
              .required("required")
              .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
    reviewText: yup.string().required("required"),
    likes: yup.string().required("required"),
    dislikes: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={showModal}
      >
        {isAdd ? "Add Title Review" : "Edit"}
      </Button>
      <Modal
        title={ isAdd ? "Add Title Review" : "Edit Title Review"}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={false}
        width={550}
        destroyOnClose={true}
      >
        <Formik
          initialValues={{
            source: initialData?.source || "",
            titleId: initialData?.titleId || titleId,
            dislikes: initialData?.dislikes || "",
            likes: initialData?.likes || "",
            reviewDate: initialData?.reviewDate || 1618813308,
            reviewText: initialData?.reviewText || "",
            userId: initialData?.userId || 1,
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
        <Form layout="vertical" onFinish={() => handleSubmit()}>
              <Row gutter={16}>
                <Col span={8} className="gutter-row">
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
                  <ErrorMessage name="source" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
                <Col span={8} className="gutter-row">
                <Form.Item label="Likes" required>    
                  <Input
                      style={{ width: "100%" }}
                      type="number"
                      placeholder="Enter likes"
                      name="likes"
                      value={values.likes}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={
                        "form-control" +
                        (errors.likes && touched.likes ? " is-invalid" : "")
                      }
                  />
                  <ErrorMessage name="likes" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
                <Col span={8} className="gutter-row">
                <Form.Item label="Dislikes" required>    
                  <Input
                      style={{ width: "100%" }}
                      type="number"
                      placeholder="Enter dislikes"
                      name="dislikes"
                      value={values.dislikes}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={
                        "form-control" +
                        (errors.dislikes && touched.dislikes ? " is-invalid" : "")
                      }
                  />
                  <ErrorMessage name="dislikes" component="div" className="invalid-feedback" />
                  </Form.Item>
                </Col>
              </Row> 
        <Form.Item label="Review Text" required>    
        <Input.TextArea
            style={{ width: "100%" }}
            rows={5}
            placeholder="Enter review text"
            name="reviewText"
            value={values.reviewText}
            onBlur={handleBlur}
            onChange={handleChange}
            className={
              "form-control" +
              (errors.reviewText && touched.reviewText ? " is-invalid" : "")
            }
        />
         <ErrorMessage name="reviewText" component="div" className="invalid-feedback" />
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

export default AddEditTitleReview;
