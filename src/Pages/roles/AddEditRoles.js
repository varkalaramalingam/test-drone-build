import { Input, Form, Button, message, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { io } from "../../api/io";
import * as yup from "yup";
import moment from "moment";
import { onlyAlphabetsareallowed } from "../../components/reusable/validations/Regex";

function AddEditPeopleRoles({ initialData, isAdd, getRolesData }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/role/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then((response) => {
        message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
        getRolesData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const updatedDateValue = moment(initialData?.updatedDate);

  const validationSchema = yup.object({
    rolename: yup.string()
                  .required("required")
                  .matches(/^\S+$/, "space not allowed")
                  .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
    roledetails: yup.string().required("required")
                    .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Add Role" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Role" : "Edit Role"}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
        width={400}
      >
        <Formik
          initialValues={{
            roledetails: initialData?.roledetails || "",
            rolename: initialData?.rolename || "",
            updatedBy: initialData?.updatedBy || "",
            updatedDate: updatedDateValue || "",
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
              <Form.Item label="Role Name" required>
                <Input
                  placeholder="Enter role name "
                  name="rolename"
                  value={values.rolename}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.rolename && touched.rolename ? " is-invalid" : "")
                  }
                />
                <ErrorMessage 
                  name="rolename"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Item>
              <Form.Item label="Roles Details" required>
                <Input
                  placeholder="Enter role details"
                  name="roledetails"
                  value={values.roledetails}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.roledetails && touched.roledetails
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="roledetails"
                  component="div"
                  className="invalid-feedback"
                />
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

export default AddEditPeopleRoles;
