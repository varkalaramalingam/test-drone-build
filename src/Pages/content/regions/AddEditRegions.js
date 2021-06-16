import { Button, Form, Input, message, Modal, Select, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import * as yup from "yup";

function AddEditRegions({ isAdd, initialData, getRegionsData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ regionData, setRegionData] = useState([]);
  const [ titleData, setTitleData] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/mastermeta/${titleId}/region/${!isAdd ? initialData.id : ""}`,
      data: fields,
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

  useEffect(() => {
    io({ method: "get", url: '/api/mastermeta/region' })
      .then(({data}) => {
        setRegionData(data.resultsMap.result)
      })
      .catch((error) => {
        console.log(error);
      });
}, [])

useEffect(() => {
  io({ method: "get", url: '/api/mastermeta' })
    .then(({data}) => {
      setTitleData(data.resultsMap.result)
    })
    .catch((error) => {
      console.log(error);
    });
}, [])



  const validationSchema = yup.object({
    regionId: yup.string().required("required"),
    titleId: yup.string().required("required"),
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
            createdon: initialData?.createdon || "",
            regionId: initialData?.regionId || undefined,
            titleId: initialData?.titleId || titleId,
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Region">
                <Select
                  placeholder="Select region "
                  showSearch
                  optionFilterProp="children"
                  name="regionId"
                  value={values.regionId}
                  allowClear
                  onChange={(value) => setFieldValue("regionId", value)}
                  className={
                    "form-control" +
                    (errors.regionId && touched.regionId ? " is-invalid" : "")
                  }
                >
                  {regionData?.map(({id, regionname}) => (
                    <Select.Option value={id}>{regionname}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="regionId" component="div" className="invalid-feedback" />
              </Form.Item>

              {/* <Form.Item label="Title">
                <Select
                  placeholder="Select title "
                  showSearch
                  optionFilterProp="children"
                  name="titleId"
                  value={values.titleId}
                  allowClear
                  onChange={(value) => setFieldValue("titleId", value)}
                  className={
                    "form-control" +
                    (errors.titleId && touched.titleId ? " is-invalid" : "")
                  }
                >
                  {titleData?.map(({id, title}) => (
                    <Select.Option value={id}>{title}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="titleId" component="div" className="invalid-feedback" />
              </Form.Item> */}

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
