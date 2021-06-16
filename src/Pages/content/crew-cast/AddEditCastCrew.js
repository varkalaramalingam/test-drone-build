import { AutoComplete, Button, Col, Form, message, Modal, Row, Select, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { io } from "../../../api/io";
import * as yup from "yup";

const { Option } = Select;

function EditCastCrew({ isAdd, initialData, titleId, getTitleRoles }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [peopleData, setPeopleData] = useState([]);
  const [rolesData, setRolesData] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/mastermeta/title/roles/${!isAdd ? initialData.id : ""}`,
      data: isAdd ? [fields] : fields,
    })
      .then(({ response }) => {
        message.success("Successfully Added Title Role");
        closeModal();
        getTitleRoles();
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.message);
      });
  };

const getPeopleData = (e) => {
    io({ method: "get", url: `/api/people/search?firstname=${e}` })
      .then(({ data = [] } = {}) => {
        setPeopleData(data?.resultsMap?.result);
      })
      .catch((error) => {
        console.log(error);
      });
    }

const getRolesData = () => {
    io({ method: "get", url: "/api/role" })
      .then(({ data }) => {
        setRolesData(data.resultsMap.result);
      })
      .catch(() => {
        console.log(false);
      });
    }

  const validationSchema = yup.object().shape({
    peopleId: yup.string().required("required"),
    roleId: yup.string().required("required"),
    isCast: yup.string().required("required"),
    isCrew: yup.string().required("required"),
  });

  const onModalBtnClick = () => {
    showModal();
    getPeopleData();
    getRolesData();
  }

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={onModalBtnClick}
      >
        {isAdd ? "Add Crew and Cast" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? `Add Crew and Cast ` : `Edit Crew and Cast`}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={false}
        width={400}
        destroyOnClose={true}
      >
        <Formik
          initialValues={{
            roleId: initialData?.roleId || undefined,
            titleId: initialData?.titleId || titleId,
            peopleId: initialData?.peopleId || undefined,
            isCast: `${initialData?.isCast}` === "0" ? 0 : initialData?.isCast  || undefined,
            isCrew: `${initialData?.isCrew}` === "0" ? 0 : initialData?.isCrew  || undefined,
            createdBy: initialData?.createdBy || "",
            modifiedBy: initialData?.modifiedBy || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, values, errors, touched, setFieldValue }) => (
            <Form
              layout="vertical"
              onFinish={() => handleSubmit()}
            >
              <Form.Item label="People Name" required>
                <AutoComplete
                    onChange={(e) => {
                      setFieldValue("peopleId", e)
                      getPeopleData(e)}}
                    placeholder="input here"
                    value={values.peopleId}
                    name="peopleId"
                  >
                     {peopleData?.map((item) => {
                     return(<Option value={item.id} key={item.id}>{item.firstname}</Option>
                  )})}
                </AutoComplete>
                <ErrorMessage
                  name="peopleId"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Item>
              <Form.Item label="Role Name" required>
                <Select
                  placeholder="Enter role name "
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
                  {rolesData?.map((item) => (
                    <Option value={item.id}>{item.rolename}</Option>
                  ))}
                </Select>
                <ErrorMessage
                  name="roleId"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Item>
              <Row span={24} gutter={10}>
                <Col span={12}>
                <Form.Item label="IsCast" required>
                <Select
                  placeholder="Select IsCast"
                  name="isCast"
                  value={values.isCast}
                  onChange={(item) => setFieldValue("isCast", item)}
                  allowClear
                  className={
                    "form-control" +
                    (errors.isCast && touched.isCast ? " is-invalid" : "")
                  }
                >
                  <Select.Option value={1} key={1}>Yes</Select.Option>
                  <Select.Option value={0} key={0}>No</Select.Option>
                </Select>
                <ErrorMessage
                  name="isCast"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="IsCrew" required>
                <Select
                  placeholder="Select IsCrew"
                  name="isCrew"
                  value={values.isCrew}
                  onChange={(item) => setFieldValue("isCrew", item)}
                  allowClear
                  className={
                    "form-control" +
                    (errors.isCrew && touched.isCrew ? " is-invalid" : "")
                  }
                >
                  <Select.Option value={1} key={1}>Yes</Select.Option>
                  <Select.Option value={0} key={0}>No</Select.Option>
                </Select>
                <ErrorMessage
                  name="isCrew"
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

export default EditCastCrew;
