import { Input, Form, Button, message, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditRatingVote({ initialData, isAdd, getRatingVotesData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/mastermeta/${titleId}/rating_votes/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then((response) => {
        message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
        getRatingVotesData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };


  const validationSchema = yup.object({
    votes: yup.string().required("required"),
    rating: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Add Rating Vote" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Rating Vote" : "Edit Rating Vote"}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
        width={400}
      >
        <Formik
          initialValues={{
            rating: initialData?.rating || "",
            titleId: initialData?.titleId || titleId,
            votes: initialData?.votes || "",
            ageRange: initialData?.ageRange || "",
            modifiedBy: initialData?.modifiedBy || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
            <Form
              layout="vertical"
              onFinish={() => handleSubmit()}
              onBlur={handleBlur}
            >
              <Form.Item label="Rating" required>
                <Input
                  placeholder="Enter rating "
                  name="rating"
                  type="number"
                  min={0}
                  max={10}
                  value={values.rating}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.rating && touched.rating ? " is-invalid" : "")
                  }
                />
                <ErrorMessage name="rating" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Votes" required>
                <Input
                  placeholder="Enter vote"
                  name="votes"
                  type="number"
                  min={0}
                  value={values.votes}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.votes && touched.votes
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="votes" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }} required>
                <Space>
                  <Button onClick={() => handleCancel()}>Close</Button>
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

export default AddEditRatingVote;
