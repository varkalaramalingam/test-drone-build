import { Button, Col, Form, Input, message, Modal, Row, Select, Space } from "antd";
import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { io } from "../../../api/io";

function AddEditAwards({ isAdd, initialData, getAwardsData, titleId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [awardsData, setAwardsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onSubmit = (fields) => {
    io({
      method: "post",
      url: `/api/mastermeta/${titleId}/{peopleId}/awards/${!isAdd ? initialData.id : ""}`,
      data: fields,
    })
      .then(({ response }) => {
        message.success(
          `Successfully ${isAdd ? "Added" : "updated"} Award`
        );
        closeModal();
        getAwardsData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  const getAwards = () => {
    io({ method: "get", url: `/api/awards` })
      .then(({ data }) => {
        setAwardsData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
    } 

    const getCategory = () => {
      io({ method: "get", url: `/api/category/{category_type}?category_type=2` })
        .then(({data}) => {
          setCategoryData(data.resultsMap.result);
        })
        .catch((error) => {
          console.log(error);
        });
      }

      const getPeopleData = () => {
        io({ method: "get", url: "/api/people" })
          .then(({ data = [] } = {}) => {
            setPeopleData(data.resultsMap.result);
          })
          .catch((error) => {
            console.log(error);
          });
        }

  const validationSchema = yup.object({
    awardsId: yup.string().required("required"),
    categoryId: yup.string().required("required"),
    peopleId: yup.string().required("required"),
    nominate: yup.string().required("required"),
    year: yup.string().required("required"),
  });

  const onModelBtn = () => {
    showModal();
    getAwards();
    getCategory();
    getPeopleData();
  }

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
        title={`${isAdd ? `Add` : `Edit`} People Award`}
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
            createdOn: initialData?.createdOn || "",
            titleId: initialData?.titleId || titleId,
            awardsId: initialData?.awardsId || undefined,
            createdBy: initialData?.createdBy || "",
            modifiedBy: initialData?.modifiedBy || "",
            modifiedOn: initialData?.modifiedOn || "",
            categoryId: initialData?.categoryId || undefined,
            nominate: initialData?.nominate || "",
            year: initialData?.year || "",
            peopleId: initialData?.peopleId || undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            onSubmit(fields);
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched, setFieldValue}) => (
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
              <Row span={24} gutter={10}>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
                <Form.Item label="People" required>
                <Select
                  showSearch
                  placeholder="Select people"
                  optionFilterProp="children"
                  name="peopleId"
                  value={values.peopleId}
                  allowClear
                  onChange={(event) => setFieldValue("peopleId", event )}
                  className={
                    "form-control" +
                    (errors.peopleId && touched.peopleId ? " is-invalid" : "")
                  }
                >
                 {peopleData?.map((item) => (
                    <Select.Option value={item.id}>{item.firstname}</Select.Option>
                  ))}
                </Select>
                <ErrorMessage name="peopleId" component="div" className="invalid-feedback" />
            </Form.Item> 
                </Col>
              </Row>
           
             <Row span={24} gutter={10}>
              <Col span={12}>
              <Form.Item label="Nomination" required>
                <Input
                  placeholder="Enter nomination"
                  name="nominate"
                  value={values.nominate}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.nominate && touched.nominate
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="nominate" component="div" className="invalid-feedback" />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Year" required>
                <Input
                  placeholder="Enter year"
                  name="year"
                  type="number"
                  value={values.year}
                  onChange={(e) => handleChange(e)}
                  className={
                    "form-control" +
                    (errors.year && touched.year
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="year" component="div" className="invalid-feedback" />
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

export default AddEditAwards;
