import { Button, Form, Modal, message, Select, Input, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { io } from "../../../api/io";
import * as yup from "yup";

function AddEditTitleAttribute({ titleId, isAdd, initialData ,getAttributeList}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [metaAttributesData, setMetaAttributesData] = useState([]);
  const [ isNumber, setIsNumber] = useState();

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {
    io({ method: "get", url: `/api/mastermeta/attributes` })
      .then(({ data = [] } = {}) => {
        setMetaAttributesData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

  const onSubmit = (fields) => {
    io({
      method: isAdd ? "post" : "put",
        url: `/api/mastermeta/${titleId}/attributes/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ data }) => {
        message.success(`Successfully ${isAdd ? 'added' : 'updated'} title attribute`);
        closeModal();
        getAttributeList();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const validationSchema = yup.object().shape({
    attributeId: yup.string().required("required"),
    dataValue: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={showModal}
      >
        {isAdd ? "Add Title Attribute" : "Edit"}
      </Button>
      <Modal
        title={ isAdd ? "Add Title Attribute" : "Edit Title Attribute"}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={false}
        width={400}
        destroyOnClose={true}
      >
        <Formik
          initialValues={{
            attributeId: initialData?.attributeId || undefined,
            createdBy: initialData?.createdBy || undefined,
            createdDate: initialData?.createdDate || 0,
            dataValue: initialData?.dataValue || "",
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
        <Form layout="vertical" onFinish={() => handleSubmit()}>
        <Form.Item label="Attribute" required>    
        <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select attribute"
            name="attributeId"
            value={values.attributeId}
            onBlur={handleBlur}
            onChange={(event, option) =>{
              setFieldValue("attributeId", event)
              option.title === "number" ? setIsNumber(true) : setIsNumber(false) 
             }}
            className={
              "form-control" +
              (errors.attributeId && touched.attributeId ? " is-invalid" : "")
            }
        >
          {metaAttributesData?.map(({ id, name, dataType }) => (
            <Select.Option key={id} title={dataType} value={id}>{name}</Select.Option>
          ))}
        </Select>
        <ErrorMessage name="attributeId" component="div" className="invalid-feedback" />
        </Form.Item>
        <Form.Item label="Attribute Value" required>    
        <Input
            style={{ width: "100%" }}
            placeholder="Enter attribute value"
            type={isNumber ? "number" : "text"}
            name="dataValue"
            value={values.dataValue}
            onBlur={handleBlur}
            onChange={handleChange}
            className={
              "form-control" +
              (errors.dataValue && touched.dataValue ? " is-invalid" : "")
            }
        />
         <ErrorMessage name="dataValue" component="div" className="invalid-feedback" />
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
