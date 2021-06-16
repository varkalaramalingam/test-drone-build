import React, { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Button, Form, message, Divider, Space, Select } from "antd";
import { ErrorMessage, Formik } from "formik";
import { io } from "../../../api/io";
import * as yup from "yup";

function AddEditUsers({ editUserRecord, isAdd, getUserDetails, userId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ tenantData, setTenantData] = useState([]);
  const [ userRoleData, setUserRoleData] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleAddUser = (fields) => {
    io({ method:isAdd ? "post":"patch", url: `/api/user/role/${!isAdd ?  editUserRecord.id : ""}`, data: fields })
      .then((response) => {
        message.success("User role added Successfully")
        handleCancel();
        getUserDetails();
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

useEffect(() => {
  io({ method: "get", url: '/api/user' })
    .then(({data}) => {
        setUserRoleData(data.resultsMap.result)
    })
    .catch((error) => {
      console.log(error);
    });
}, [])

  const validationSchema = yup.object({
    tenantId: yup.string().required("required"),
    roleId: yup.string().required("required"),
  });
  
  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd & "10px" }}
      >
        {isAdd ? "Add Role" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Role" : "Edit"}
        visible={isModalVisible}
        destroyOnClose={true}
        onOk={showModal}
        onCancel={handleCancel}
        footer={null}
        width={450}
      >
        <Formik
          initialValues={{
              userId: editUserRecord?.userId || userId,
              createdOn: editUserRecord?.id || 0,
              tenantId: editUserRecord?.tenantId || undefined,
              modifiedOn: editUserRecord?.id || 0,
              roleId: editUserRecord?.roleId || undefined,
            }}
            validationSchema={validationSchema} 
          onSubmit={(fields) => {
            handleAddUser(fields);
          }}
        >
          {({ handleSubmit,handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
            <Form
              layout="vertical"
              onFinish={handleSubmit}
            >
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

              <Form.Item label="Role">
                <Select
                  placeholder="Select role "
                  showSearch
                  optionFilterProp="children"
                  name="roleId"
                  value={values.roleId}
                  allowClear
                  onChange={(value) => setFieldValue("roleId", value)}
                  className={
                    "form-control" +
                    (errors.roleId && touched.roleId ? " is-invalid" : "")
                  }
                >
                  {userRoleData?.map(({id, role}) => (
                    <Select.Option value={id}>{role}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="roleId" component="div" className="invalid-feedback" />
              </Form.Item>
              <Divider span={24} />
              <Form.Item style={{ textAlign: "right" }} required>
                <Space>
                  <Button onClick={() => handleCancel()}>Close</Button>
                  <Button type="primary" htmlType="submit">Submit</Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}

export default AddEditUsers;