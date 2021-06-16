import React,{ useEffect, useState} from "react";
import Modal from "antd/lib/modal/Modal";
import { Input, Button,Form, message ,Select, Space, Row, Col} from "antd";
import { io } from "../../api/io";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

function AddEditRawCatalogue({initialData , isAdd , getRawCatalogueData}) {
    const {Option} = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const closeModel = () => setIsModalVisible(false);
    const [tenantData, setTenantData] = useState([]);

    const onSubmit = (fields) => {
        io({
            method: isAdd ? "post" : "patch",
            url: `/api/rawdataCatalog/${!isAdd ? initialData.id : ""}`,
            data: fields,
        })
        .then((response) =>{
           message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
           getRawCatalogueData();
           closeModel();
        })
        .catch((error) => {
            console.error();
            message.error(error.message);
        });
    };

    const validationSchema = yup.object({
      src: yup.string().required("required"),
      url: yup.string().required("required"),
      description: yup.string().required("required"),
      active: yup.string().required("required"),
      tenantId: yup.string().required("required"),
    });
   
  useEffect(() => {
      io({ method: "get", url: `/api/tenant/active` })
        .then(({ data = [] } = {}) => {
          setTenantData(data.resultsMap.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (
        <>
          <Button
        type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        { isAdd ? "Add Raw Data Catalogue" : "Edit"}
      </Button>
        <Modal 
           title={isAdd ? "Add Raw Data Catalogue" : "Edit Raw Data Catalogue"}
           visible={isModalVisible}
           onOk={showModal}
           onCancel={closeModel}
           footer={null}
           destroyOnClose={true}
           width={400}
           >
            <Formik
              initialValues={{
                  description: initialData?.description || "",
                  active:initialData?.active || 1,
                  createdBy: initialData?.createdBy || "",
                  createdOn:initialData?.createdOn || "",
                  modifiedBy: initialData?.modifiedBy || "",
                  modifiedOn:initialData?.modifiedOn || "",
                  rundate:initialData?.rundate || "",
                  src: initialData?.src || "",
                  url: initialData?.url || "",
                  tenantId: initialData?.tenantId || undefined,
              }}
              validationSchema={validationSchema}
              onSubmit={(fields) => {
                  onSubmit(fields);
              }}
            >
                {({ handleSubmit, handleChange, values, setFieldValue, errors, touched }) =>(
            <Form layout="vertical" onFinish={() => handleSubmit()}>
              <Row gutter={10}>
                <Col span={12}>
                <Form.Item label="Source" required>
                  <Input
                    placeholder="Enter source"
                    name="src"
                    value={values.src}
                    onChange={handleChange}
                    className={"form-control" + (errors.src && touched.src ? " is-invalid": "")}
                  />
                  <ErrorMessage name="src" component="div" className="invalid-feedback" />
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Active" required>
                  <Select
                     name="active"
                     value={values.active}
                     placeholder="select active"
                     onChange={(value) => setFieldValue("active", value)}
                     allowClear 
                     className={ "form-control" +(errors.active && touched.active? " is-invalid": "")}
                     >
                      <Option value={1} key="1">Enable</Option> 
                      <Option value={0} key="0">Disable</Option>  
                     </Select>
                <ErrorMessage name="active" component="div" className="invalid-feedback" />
                </Form.Item>
                </Col>
                </Row>
                <Form.Item label="Tenant" required>
                    <Select name="tenantId" placeholder="select tenant" onChange={(event) => setFieldValue("tenantId", event)} 
                    className={ "form-control" + (errors.tenantId && touched.tenantId ? " is-invalid" : "")}
                    allowClear>
                        {tenantData && 
                        Array.isArray(tenantData) &&
                        tenantData !== "" &&
                        tenantData?.map((data) => (
                            <Option value={data.id} key={data.id}>{data.tenantName}</Option>
                        ))}
                    </Select>
                    <ErrorMessage name="tenantId" component="div" className="invalid-feedback"/>
                </Form.Item>
                <Form.Item label="Url" required>
                  <Input
                    placeholder="Enter url"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    className={"form-control" +(errors.url && touched.url? " is-invalid": "")}
                  />
                  <ErrorMessage name="url" component="div" className="invalid-feedback" />
                </Form.Item>
                <Form.Item label="Description" required>
                 <Input.TextArea
                   placeholder="Enter Description"
                   name="description"
                   value={values.description}
                   onChange={(e) => setFieldValue("description", e.target.value)}
                   className={"form-control" +(errors.description && touched.description? " is-invalid": "")}
                />
                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                </Form.Item>
                <Form.Item style={{ textAlign: "right" }}>
                <Space>
                  <Button onClick={() => closeModel()}>Close</Button>
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

export default AddEditRawCatalogue;