import { Input, Form, Button, message, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditVote({ initialData, isAdd, getVotesData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/mastermeta/${titleId}/age_votes/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then((response) => {
        message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
        getVotesData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };


  const validationSchema = yup.object({
    ageRange: yup.string().required("required"),
    votes: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Add Vote" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Vote" : "Edit Vote"}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
        width={400}
      >
        <Formik
          initialValues={{
            votes: initialData?.votes || "",
            ageRange: initialData?.ageRange || "",
            modifiedBy: initialData?.modifiedBy || "",
            titleId: initialData?.titleId || titleId,
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
              <Form.Item label="Age Range" required>
                <Input
                  placeholder="Example : 18-30"
                  type="ageRange"
                  name="ageRange"
                  value={values.ageRange}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.ageRange && touched.ageRange ? " is-invalid" : "")
                  }
                />
                <ErrorMessage name="ageRange" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Votes" required>
                <Input
                  placeholder="Enter votes"
                  type="number"
                  name="votes"
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

export default AddEditVote;
