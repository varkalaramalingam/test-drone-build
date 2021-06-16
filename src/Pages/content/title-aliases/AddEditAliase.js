import { Form, Button, message, Space, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditAliase({ initialData, isAdd, getAliasesData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ regionData, setRegionData] = useState([]);
  const [ languageData, setLanguageData ] = useState([]);
  const [ catalogueData, setCatalogueData ] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/mastermeta/${titleId}/aliases/${!isAdd ? initialData.idNumber : ""}`,
      data: fields,
    })
      .then((response) => {
        message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
        getAliasesData();
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const getRegionData = () => {
    io({ method: "get", url: '/api/mastermeta/region' })
      .then(({data}) => {
        setRegionData(data.resultsMap.result)
      })
      .catch((error) => {
        console.log(error);
      });
}

const getCatalogueData = () => {
  io({ method: "get", url: '/api/mastermeta?pageNumber=1&pagesize=1000' })
    .then(({data}) => {
      setCatalogueData(data.resultsMap.result)
    })
    .catch((error) => {
      console.log(error);
    });
}

const getLanguageData = () => {
  io({ method: "get", url:"/api/language" })
    .then(({ data = [] } = {}) => {
      setLanguageData(data.resultsMap.result);
    })
    .catch(() =>{
      console.log(false);
    })
  }

  const validationSchema = yup.object({
    languageId: yup.string().required("required"),
    regionId: yup.string().required("required"),
  });

  const onModalClick = () => {
    showModal();
    getLanguageData();
    getRegionData();
    getCatalogueData();
  }

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        onClick={onModalClick}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        {isAdd ? "Add Title Alias" : "Edit"}
      </Button>
      <Modal
        title={isAdd ? "Add Title Alias" : "Edit Title Alias"}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose={true}
        width={400}
      >
        <Formik
          initialValues={{
            languageId: initialData?.languageId || undefined,
            aliasTitleName: initialData?.aliasTitleName || undefined,
            regionId: initialData?.regionId || undefined,
            titleId: initialData?.titleId || titleId,
            aliasesTitleId: initialData?.aliasesTitleId || undefined,
            metaTitleId: initialData?.metaTitleId || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleBlur, values, errors, touched, setFieldValue }) => (
            <Form
              layout="vertical"
              onFinish={() => handleSubmit()}
              onBlur={handleBlur}
            >
              <Form.Item label="Alias Title">
                <Select
                  placeholder="Select alias Title "
                  showSearch
                  optionFilterProp="children"
                  name="aliasTitleName"
                  value={values.aliasTitleName}
                  allowClear
                  onChange={(value, item) => {
                    setFieldValue("aliasTitleName", item.key);
                    setFieldValue("metaTitleId", value);
                    setFieldValue("aliasesTitleId", item.title);
                    console.log(item.title);
                  }}
                  className={
                    "form-control" +
                    (errors.aliasesTitleId && touched.aliasesTitleId ? " is-invalid" : "")
                  }
                >
                  {catalogueData?.map(({metaTitleId, title, id}) => (
                    <Select.Option value={metaTitleId} title={id}  key={title}>{title}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="aliasesTitleId" component="div" className="invalid-feedback" />
              </Form.Item>
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
              <Form.Item label="Language" required>
              <Select
                name="languageId"
                value={values.languageId}
                placeholder="select Language"
                onChange={(id) => setFieldValue("languageId", id )}
                allowClear
                showSearch
                  optionFilterProp="children"
              >
                 {languageData?.map(({id, language}) => (
                  <Select.Option key={id} value={id}>
                    {language}
                  </Select.Option>
                ))}
                  className={
                  "form-control" +
                  (errors.languageId && touched.languageId
                    ? " is-invalid"
                    : "")
                }
              </Select>
              <ErrorMessage name="languageId" component="div" className="invalid-feedback" />
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

export default AddEditAliase;
