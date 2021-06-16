import { Button, Form, Input, message, Modal, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../api/io";
import { onlyAlphabetsareallowed } from "../../components/reusable/validations/Regex";

function AddEditAwards({ isAdd, initialData, getAwardsData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/awards/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ response }) => {
        message.success(
          `Successfully ${isAdd ? "added" : "updated"} Award`
        );
        closeModal();
        getAwardsData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object({
    awardname: yup.string().required("required")
                .matches(/^\S+$/, "space not allowed")
                .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={showModal}
      >
        {isAdd ? "Add Award" : "Edit"}
      </Button>
      <Modal
        title={`${isAdd ? `Add` : `Edit`} Award`}
        visible={isModalVisible}
        onOk={onSubmit}
        onCancel={closeModal}
        footer={false}
        okText="Submit"
        width={400}
        destroyOnClose={true}
      >
        <Formik
          initialValues={{
            modifiedBy: initialData?.modifiedBy || "",
            createdBy: initialData?.createdBy || "",
            regionname: initialData?.regionname || "",
            awardname:  initialData?.awardname || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Award Name" required>
                <Input
                  placeholder="Enter award name"
                  name="awardname"
                  value={values.awardname}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.awardname && touched.awardname
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="awardname"
                  component="div"
                  className="invalid-feedback"
                />
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

export default AddEditAwards;
