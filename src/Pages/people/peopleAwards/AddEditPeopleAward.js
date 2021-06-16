import { Button, Form, message, Modal, Select, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditPeopleAward({ isAdd, initialData, getPeopleAwards, peopleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [awardsData, setAwardsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/${peopleId.peopleId}/awards/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ response }) => {
        message.success(
          `Successfully ${isAdd ? "Added" : "updated"} Region`
        );
        closeModal();
        getPeopleAwards();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const getCategory = () => {
    io({ method: "get", url: `/api/category` })
      .then(({data}) => {
        setCategoryData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    const onModelBtn = () => {
      showModal();
      getCategory();
    }
  

  useEffect(() => {
    io({ method: "get", url: `/api/awards` })
      .then(({ data }) => {
        setAwardsData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []) 
  

  const validationSchema = yup.object({
    awardsId: yup.string().required("required"),
    categoryId: yup.string().required("required"),
  });

  return (
    <>
      <Button
        type={isAdd ? "primary" : "link"}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
        onClick={onModelBtn}
      >
        {isAdd ? "Add People Award" : "Edit"}
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
            awardsId: initialData?.awardsId || undefined,
            categoryId: initialData?.categoryId || undefined,
            createdBy: initialData?.createdBy || "",
            modifiedBy: initialData?.modifiedBy || "",
            peopleId: initialData?.regionname || peopleId.peopleId,
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Awards" required>
                <Select
                  placeholder="Select Awards"
                  optionFilterProp="children"
                  name="awards"
                  value={values.awardsId}
                  allowClear
                  onChange={(event) => setFieldValue("awardsId", event )}
                  className={
                    "form-control" +
                    (errors.awardsId && touched.awardsId ? " is-invalid" : "")
                  }
                >
                  {awardsData?.map(({id, awardname}) => (
                    <Select.Option value={id}>{awardname}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="awardsId" component="div" className="invalid-feedback" />
              </Form.Item>
              <Form.Item label="Category" required>
                <Select
                  placeholder="Select category"
                  optionFilterProp="children"
                  name="categoryId"
                  value={values.categoryId}
                  allowClear
                  onChange={(event) => setFieldValue("categoryId", event )}
                  className={
                    "form-control" +
                    (errors.categoryId && touched.categoryId ? " is-invalid" : "")
                  }
                >
                  {categoryData?.map(({id, categoryname}) => (
                    <Select.Option value={id}>{categoryname}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="categoryId" component="div" className="invalid-feedback" />
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

export default AddEditPeopleAward;
