import React,{ useState} from "react";
import Modal from "antd/lib/modal/Modal";
import { Input, Button,Form, message ,Select, Space} from "antd";
import { io } from "../../api/io";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

function AddEditUserRoles({initialData , isAdd , getuserRolesData}) {
    const {Option} = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => setIsModalVisible(true);
    const closeModel = () => setIsModalVisible(false);

    const onSubmit = (fields) => {
        io({
            method: isAdd ? "post" : "patch",
            url: `/api/user/${!isAdd ? initialData.id : ""}`,
            data: fields,
        })
        .then((response) =>{
           message.success(`${isAdd ? "Added" : "Updated"} Successfully`);
           getuserRolesData();
           closeModel();
        })
        .catch((error) => {
            console.error();
            message.error(error.message);
        });
    };

    const validationSchema = yup.object({
      role: yup.string().required("required"),
      description: yup.string().required("required"),
      active: yup.string().required("required"),
    });
   
    return (
        <>
          <Button
        type={isAdd ? "primary" : "link"}
        onClick={showModal}
        style={{ float: isAdd && "right", marginBottom: isAdd && "10px" }}
      >
        { isAdd ? "Add User Role" : "Edit"}
      </Button>
        <Modal 
           title={isAdd ? "Add User Roles" : "Edit"}
           visible={isModalVisible}
           onOk={showModal}
           onCancel={closeModel}
           footer={null}
           destroyOnClose={true}
           width={400}
           >
            <Formik
              initialValues={{
                  id:initialData?.id || "",
                  role:initialData?.role || "",
                  description: initialData?.description || "",
                  active:initialData?.active || 1
              }}
              validationSchema={validationSchema}
              onSubmit={(fields) => {
                  onSubmit(fields);
              }}
            >
                {({ handleSubmit, handleChange, values, setFieldValue, errors, touched }) =>(
            <Form layout="vertical" onFinish={() => handleSubmit()}>
                <Form.Item
                  label="Roles"
                >
                  <Input
                    placeholder="Enter Roles"
                    name="role"
                    value={values.role}
                    onChange={(e) => handleChange(e)}
                    className={
                      "form-control" +
                      (errors.role && touched.role
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage name="role" component="div" className="invalid-feedback" />
                </Form.Item>
                <Form.Item
                   label="Description"
                >
                 <Input
                   placeholder="Enter Description"
                   name="description"
                   value={values.description}
                   onChange={(e) => handleChange(e)}s
                   className={
                    "form-control" +
                    (errors.description && touched.description
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                </Form.Item>
                <Form.Item label="Active" required>
                  <Select
                     name="active"
                     value={values.active}
                     placeholder="select active"
                     onChange={(value) => setFieldValue("active", value)}
                     allowClear 
                     className={
                      "form-control" +
                      (errors.active && touched.active
                        ? " is-invalid"
                        : "")
                    }
                     >
                      <Option value={1} key="1">Enable</Option> 
                      <Option value={0} key="0">Disable</Option>  
                     </Select>
                <ErrorMessage name="active" component="div" className="invalid-feedback" />
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

export default AddEditUserRoles;