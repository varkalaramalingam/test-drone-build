import React, { useEffect, useState } from "react";
import { Table, Space, Button, Row, message, Modal, Form, Input } from "antd";
import { io } from "../../api/io";
import { Formik, ErrorMessage } from "formik"
import * as yup from "yup"
import { onlyAlphabetsareallowed } from "../../components/reusable/validations/Regex"

function Languages() {

    const validationSchema = yup.object({
        language: yup.string()
            .required("required")
            .matches(onlyAlphabetsareallowed, "Only alphabets are allowed")
            .matches(/^\S+$/, "space not allowed"),
        code: yup.string()
            .required("required")
            .matches(onlyAlphabetsareallowed, "Only alphabets are allowed"),
    });

    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState("Add");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editLangRecord, setEditLangRecord] = useState({})

    useEffect(() => {
        setLoading(true);
        getLanguages();
    }, []);

    const getLanguages = () => {
        io({ method: "get", url: '/api/language' })
        .then(({ data : { resultsMap : { result = [] }} } = {}) => {
          setLanguages(result);
          setLoading(false);
        })
        .catch((err) => {
            console.log(err);
          setLoading(false);
        });
    }

    const columns = [
    {
        title: "Id",
        dataIndex: "id",
        align: "center",
        key: "id",
    },
    {
        title: "Name",
        dataIndex: "language",
        align: "center",
        key: "language",
    },
    {
        title: "Code",
        dataIndex: "code",
        align: "center",
        key: "code",
    },
    {
        title: "Action",
        align: "center",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
        <Space size="middle">
            <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
        </Space>
        ),
    },
    ];

    const showModal = () => {
        setAction("Add")
        setIsModalVisible(true);
    };

    const handleAddLanguage = (fields) => {
        io({ method: "post", url: '/api/language', data: fields })
        .then((result) => {
          console.log(result);
          setIsModalVisible(false);
          message.success("Language " + fields.language + " Created Successfully")
          getLanguages();
        })
        .catch((err) => {
            console.log(err);
            message.error("Failed to create Language");
        });
    }

    const handleEdit = (record) => {
        setAction("Edit")
        setEditLangRecord(record)
        setIsModalVisible(true);
    }

    const handleEditLanguage = (fields) => {
        io({ method: "patch", url: `/api/language/${fields.id}`, data: fields })
        .then((result) => {
          console.log(result);
          setIsModalVisible(false);
          message.success("Language " + fields.language + " Edited Successfully")
          getLanguages();
        })
        .catch((err) => {
            console.log(err);
            message.error("Failed to edit Language");
        });
    }
    
    const handleCancel = () => setIsModalVisible(false);

    return (
    <React.Fragment>
        <div className="languagesComponent">
            <Row style={{ justifyContent:"space-between" }}>
                <h2 style={{ float: "left" }}>Languages</h2>
                <Button 
                    type="primary" 
                    style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
                    onClick={showModal}
                >
                    Add Language
                </Button>
            </Row>
            <Table
                dataSource={languages}
                columns={columns}
                rowKey="id"
                loading={loading}
                size="small"
                scroll={{x: "auto"}}
            />
            <Modal 
                title={ action === "Add" ? "Add Language" : "Edit Language" }
                visible={isModalVisible} 
                onCancel={handleCancel}
                footer={null}
                width={350}
                destroyOnClose={true}
            >
                <Formik
                    initialValues={ action === "Add" ? {
                            language: "",
                            code: "",
                        } : 
                        {
                            id: editLangRecord.id,
                            language: editLangRecord.language,
                            code: editLangRecord.code,
                        }
                    }
                    validationSchema={validationSchema}
                    onSubmit={(fields) => {
                        if(action === "Add"){
                            handleAddLanguage(fields);
                        } else {
                            handleEditLanguage(fields);
                        }
                    }}
                    >
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                        <Form layout="vertical" onFinish={handleSubmit}>
                            <Form.Item label="Language" htmlFor="language" required>
                                <Input name="language" type="text" placeholder="Enter language name" value={values.language} onChange={handleChange} onBlur={handleBlur} 
                                    className={ "form-control" +(errors.language && touched.language? " is-invalid": "")}
                                />
                                <ErrorMessage name="language" component="div" className="invalid-feedback"/>
                            </Form.Item>
                            <Form.Item label="Code" htmlFor="code" required>
                                <Input name="code" type="text"  placeholder="Enter language code" value={values.code} onChange={handleChange} onBlur={handleBlur} 
                                    className={"form-control" +(errors.code && touched.code? " is-invalid": "")}
                                />
                                <ErrorMessage name="code" component="div" className="invalid-feedback"/>
                            </Form.Item>
                              <Form.Item style={{ textAlign: "right" }}>
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
        </div>
    </React.Fragment>
    );
}

export default Languages
