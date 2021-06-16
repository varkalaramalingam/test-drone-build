import { Button, Form, Input, message, Modal, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../api/io";
import { onlyAlphabetsareallowed } from "../../components/reusable/validations/Regex";

function AddEditRegions({ isAdd, initialData, getRegionsData }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    let capitalizedText = fields.regionname.charAt(0).toUpperCase() + fields.regionname.slice(1);
    let regionCode = fields.region.toUpperCase();
    io({
      method: isAdd ? "post" : "patch",
      url: `/api/mastermeta/region/${!isAdd ? initialData.id : ""}`,
      data: {...fields, regionname: capitalizedText, region:regionCode},
    })
      .then(({ response }) => {
        message.success(
          `Successfully ${isAdd ? "Added" : "updated"} Region`
        );
        closeModal();
        getRegionsData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object({
    regionname: yup.string().required("required")
                    .matches(/^\S+$/, "space not allowed")
                    .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
    region: yup.string().required("required")
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
        {isAdd ? "Add Region" : "Edit"}
      </Button>
      <Modal
        title={`${isAdd ? `Add` : `Edit`} Region`}
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
            id:initialData?.id || 0,
            region: initialData?.region || "",
            regionname: initialData?.regionname || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => onSubmit(fields)}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Region Name" required>
                <Input
                  placeholder="Enter region name"
                  name="regionname"
                  autoFocus
                  value={values.regionname}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.regionname && touched.regionname
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="regionname" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Region Code" required>
                <Input
                  placeholder="Enter Region"
                  name="region"
                  value={values.region}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.region && touched.region ? " is-invalid" : "")
                  }
                />
                <ErrorMessage name="region" component="div" className="invalid-feedback" />
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

export default AddEditRegions;
