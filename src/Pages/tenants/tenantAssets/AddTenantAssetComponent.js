import { useState, useEffect } from "react";
import { Form, Button, Space, Modal, Select, message } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { io } from "../../../api/io";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

const { Option } = Select;

function AddTenantAssetComponent({isAdd, initialData, getTenantAssetData}){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [totalRecords, setTotalRecords] = useState(100);
    const [tenantData, setTenantData] = useState([]);
    const [titleData, setTitleData] = useState([]);

    const showModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);
   
    useEffect(() => {
        getTenantNamesData();
        getTitleNamesData();
    }, [totalRecords]);

    const validationSchema = yup.object({
        tenantAssetsId: yup.string().required("required"),
        titleAssetsId: yup.array().of(yup.string().min(1).required("required")),
      });
   
    const getTenantNamesData = () => {
        io({ method: "get", url: `/api/tenant/active` })
          .then(({ data = [] } = {}) => {
            setTenantData(data.resultsMap.result);
          })
          .catch((error) => {
            console.log(error);
          });
        };

    const getTitleNamesData = async () => {
        io({ method: "get", url: `/api/mastermeta?pageNumber=1&pagesize=${totalRecords}`})
        .then(({ data = [] } = {}) => {
           console.log(data);
           setTotalRecords(data.totalRecords)
          setTitleData(data.resultsMap.result);
        })
        .catch((error) => {
          message.error(error.message);
        });
    
    };

    const onSubmit = (fields) => {
        io({
            method: "post",
            url: `/api/tenant/assets/${!isAdd ? fields.id : ""}`,
            data: fields
        })
        .then(({ data = [] } = {}) => {
            message.success(`${isAdd ? "Tenant Asset Added Successfully" : "Tenant Asset updated Successfully"}`);
            closeModal();
            getTenantAssetData();
        })
        .catch((error) => {
            message.error(error.message);
        });
    };

    return(
        <>
        <Button type={isAdd ? "primary" : "link" } onClick={showModal}
                  style={{float:isAdd && "right", marginBottom:isAdd &&"10px"}} >
        { isAdd ? "Add Tenant Asset" : <EditOutlined />}
        </Button>

        <Modal 
            visible={isModalVisible} 
            title={isAdd ? "Add Tenant Asset" : "Edit Tenant Asset"}
            onOk={showModal} 
            onCancel={ closeModal } 
            footer={null} 
            width={400} destroyOnClose={true}>
            <Formik
        initialValues={{
            tenantAssetsId: initialData?.tenantAssetsId || "",
            titleAssetsId: initialData?.titleAssetsId || [""],
            active: initialData?.active || 1
        }}
        validationSchema={validationSchema}
        onSubmit={(fields) => {
          onSubmit(fields);
        }}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
            <Form layout="vertical" onFinish={() => handleSubmit()}>
                <Form.Item label="Tenant Name" required>
                    <Select name="tenantAssetsId" placeholder="select tenant" onChange={(event) => setFieldValue("tenantAssetsId", event)} 
                    className={ "form-control" + (errors.tenantAssetsId && touched.tenantAssetsId ? " is-invalid" : "")}
                    allowClear>
                        {tenantData && 
                        Array.isArray(tenantData) &&
                        tenantData !== "" &&
                        tenantData?.map((data) => (
                            <Option value={data.id} key={data.id}>{data.tenantName}</Option>
                        ))}
                    </Select>
                    <ErrorMessage
                    name="tenantAssetsId"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Item>
                <Form.Item label="Title Name" required>
                    <Select mode="multiple" showSearch optionFilterProp="children" name="titleAssetsId" placeholder="select title" onChange={(event) => setFieldValue("titleAssetsId", event)} className={
                      "form-control" +
                      (errors.titleAssetsId && touched.titleAssetsId
                        ? " is-invalid"
                        : [""])
                    } allowClear>
                        {titleData && 
                        Array.isArray(titleData) &&
                        titleData?.map((data) => (
                            <Option value={data.id} key={data.id}>{data.title}</Option>
                        ))}
                    </Select>
                    <ErrorMessage
                    name="titleAssetsId"
                    component="div"
                    className="invalid-feedback"
                  />
                </Form.Item>
                <Form.Item label="Active" required>
                    <Select name="active" placeholder="select active" defaultValue={1} onChange={(event) => setFieldValue("active", event)} allowClear>
                        <Option value={1} key={1}>Enable</Option>
                        <Option value={0} key={0}>Disable</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space style={{ float: "right" }}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button type="default" onClick={ closeModal }>Close</Button>
                    </Space>
                </Form.Item>
            </Form>
            )}
            </Formik>
        </Modal>
        </>
    );
}

export default AddTenantAssetComponent