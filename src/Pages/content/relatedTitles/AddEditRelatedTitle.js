import { Button, Form, Modal, message, Select, Input, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import * as yup from "yup";

function AddEditTitleAttribute({ titleId, isAdd, initialData, getRelatedTitlesList}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mastermetaData, setMastermeta] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    io({ method: "get", url: `/api/mastermeta` })
      .then(({ data = [] } = {}) => {
        setMastermeta(data.resultsMap.result);;
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

  const onSubmit = (fields) => {
    io({
      method: isAdd ? "post" : "put",
        url: `/api/mastermeta/${titleId}/related/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ data }) => {
        message.success(`Successfully ${isAdd ? 'added' : 'updated'} related title`);
        closeModal();
        getRelatedTitlesList();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object().shape({
    relatedTitleId: yup.string().required("required"),
    ranking: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={showModal}
      >
        {isAdd ? "Add Related Title " : "Edit"}
      </Button>
      <Modal
        title={ isAdd ? "Add Related Title" : "Edit Related Title"}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={false}
        width={400}
        destroyOnClose={true}
      >
        <Formik
          initialValues={{
            relatedTitleId: initialData?.relatedTitleId || undefined,
            createdBy: initialData?.createdBy || undefined,
            createdDate: initialData?.createdDate || 0,
            ranking: initialData?.ranking || "",
            modifiedBy: initialData?.modifiedBy || "",
            modifiedDate: initialData?.modifiedDate || 0,
            titleid: initialData?.titleid || titleId,
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
        <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Related Title" required>    
        <Select
            showSearch
            allowClear
            style={{ width: "100%" }}
            placeholder="Select attribute"
            name="relatedTitleId"
            value={values.relatedTitleId}
            onBlur={handleBlur}
            onChange={(event) => setFieldValue("relatedTitleId", event)}
            className={
              "form-control" +
              (errors.relatedTitleId && touched.relatedTitleId ? " is-invalid" : "")
            }
        >
          {mastermetaData?.filter(({ id, title }) => (id !== titleId))
            .map(({ id, title }) => (
            <Select.Option key={id} value={id}>{title}</Select.Option>
          ))}
        </Select>
        <ErrorMessage name="relatedTitleId" component="div" className="invalid-feedback" />
        </Form.Item>
        <Form.Item label="Rank" required>    
        <Input
            style={{ width: "100%" }}
            type="number"
            allowClear
            placeholder="Enter attribute value"
            name="ranking"
            value={values.ranking}
            onBlur={handleBlur}
            onChange={handleChange}
            className={
              "form-control" +
              (errors.ranking && touched.ranking ? " is-invalid" : "")
            }
        />
         <ErrorMessage name="ranking" component="div" className="invalid-feedback" />
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

export default AddEditTitleAttribute;
