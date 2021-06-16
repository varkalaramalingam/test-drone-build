import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { Input, Button, Select, Form, message, Space } from "antd";
import {io} from "../../../api/io";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import { onlyAlphabetsareallowed } from "../../../components/reusable/validations/Regex";

function AddSubGenresComponent({initialData , isAdd , getData}) {
  const {Option} = Select;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const closeModel = () => setIsModalVisible(false);
    
    const onSubmit = (Fields) => {
        io({
            method: isAdd ? "post" : "patch",
            url: `/api/subgenre/${!isAdd ? initialData.id : ""}`,
            data: Fields,
          })
            .then((response) => {
              message.success(`${isAdd ? "SubGenre Added Successfully" : "SubGenre updated Successfully"}`);
              getData();
              closeModel();
            })
            .catch((error) => {
              console.error();
              message.error(error.message);
            });
    };

    const validationSchema = yup.object({
      name: yup.string().required("required")
                        .matches(/^\S+$/, "space not allowed")
                        .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
      active: yup.string().required("required"),
    });
   
    return (
      <> 
       <Button 
         type={isAdd ? "primary" : "link"} 
         onClick={showModal} 
         style={{float:isAdd && "right", marginBottom:isAdd &&"10px"}}
         >
           {isAdd ? "Add SubGenre" : "Edit"} 
        </Button>
        <Modal
           title={isAdd ? "Add SubGenre" : "Edit SubGenre"}
           visible={isModalVisible}
           onOk={showModal}
           onCancel={closeModel}
           footer={null}
           width={400}
           destroyOnClose={true}
         >
           <Formik
             initialValues={{
               name:initialData?.name || "",
               active:`${initialData?.active}` === "0" ? 0 : null || 1,
               modifiedBy:initialData?.modifiedBy || ""
             }}
               validationSchema={validationSchema}
               onSubmit={Fields => onSubmit(Fields)}
            >
              {({ handleSubmit, handleChange, setFieldValue, values, errors, touched}) => (
                <Form layout="vertical" onFinish={() => handleSubmit()}>
                <Form.Item label="Sub Genres" required>
                  <Input
                    placeholder="Enter SubGenres"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e)}
                    className={"form-control" + (errors.name && touched.name ? " is-invalid" : "")}
                    />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </Form.Item>
                <Form.Item label="Active" required>
                  <Select
                     name="active"
                     placeholder="Select subGenre state"
                     value={values.active} 
                     onChange={(value) => setFieldValue("active",value)}
                     allowClear 
                     className={"form-control" + (errors.active && touched.active ? " is-invalid" : "")}
                     >
                       <Option value={1} key={1}>Enable</Option>
                       <Option value={0} key={0}>Disable</Option>
                     </Select>
                <ErrorMessage name="active" component="div" className="invalid-feedback" />
                </Form.Item>
                <Form.Item
                  label="Modified By"
                >
                  <Input
                    placeholder="Enter modifiedBy"
                    name="modifiedBy"
                    value={values.modifiedBy}
                    onChange={(e) => handleChange(e)}
                  />
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

export default AddSubGenresComponent;




