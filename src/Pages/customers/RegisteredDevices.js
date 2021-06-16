import React, { useState, useEffect } from 'react'
import { Table, Space, Button, Row, Col, message, Modal, Form, Select, Input, Divider } from "antd"
import { Formik, ErrorMessage } from "formik"
import * as yup from "yup";
import { io } from "./../../api/io"

export default function RegisteredDevices({ customerData }) {

    const [devicesData, setDevicesData] = useState([])
    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState("Add");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editDeviceRecord, setEditDeviceRecord] = useState({});

    useEffect(() =>{
        getRegisteredDevices()
    }, [])

    const columns = [
        { title: "Id", dataIndex: "id", key: "id" },
        { title: "Device Type", dataIndex: "devicetype", key: "devicetype"},
        { title: "Device Id", dataIndex: "deviceId", key: "deviceId" },
        { title: "Active", dataIndex: "active", key: "active" },
        {
          title: "Action", dataIndex: "vieworedit", key: "vieworedit", fixed: 'right',
          render: (text, record) => (
            <Space size="middle">
                <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                <Button type="link" onClick={() => handleDeleteDevice(record)}>Delete</Button>
            </Space>
          ),
        },
    ];

    const getRegisteredDevices = () => {
        io({ method: "get", url: `/api/customer/${customerData.id}/device` })
            .then(({ data : { resultsMap : { result = [] }} } = {}) => {
              setDevicesData(result);
              console.log(result);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
    }

    const showModal = () => {
        setAction("Add")
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddDevice = (fields) => {
        io({ method: "post", url: `/api/customer/${customerData.id}/device`, data: fields })
        .then((response) => {
          console.log(response);
          message.success("Device " + fields.devicetype + " " + fields.deviceId + " Added Successfully")
          handleCancel()
          getRegisteredDevices()
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const handleEdit = (record) => {
        setAction("Edit")
        setEditDeviceRecord(record)
        setIsModalVisible(true);
    }
    
    const handleEditDevice = (fields) => {
        io({ method: "post", url: `/api/customer/${customerData.id}/device/${fields.id}`, data: fields })
        .then((response) => {
          console.log(response);
          message.success("Device " + fields.devicetype + " " + fields.deviceId + " Edited Successfully")
          handleCancel()
          getRegisteredDevices()
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
    const handleDeleteDevice = (record) => {
        io({ method: "delete", url: `/api/customer/${customerData.id}/device/${record.id}` })
        .then((response) => {
          message.success("Device " + record.devicetype + " " + record.deviceId + " Deleted Successfully")
          handleCancel()
          getRegisteredDevices()
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const validationSchema = yup.object({
        devicetype: yup.string().required("required"),
        deviceId: yup.string().required("required"),
      });

    return (
        <div>
            <Row style={{ justifyContent:"space-between" }}>
                <Col span={12}>
                <h2>User Devices</h2>
                </Col>
                <Col span={12}>
                    <Button 
                        type="primary" 
                        style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
                        onClick={showModal}
                    >
                        Add Device
                    </Button>
                </Col>
            </Row>
            <Table
                dataSource={devicesData}
                columns={columns}
                rowKey="id"
                loading={loading}
                size="small"
                style={{ paddingBottom: "20px", whiteSpace: "nowrap" }}
                scroll={{ x: "auto" }}
            />
            <Modal 
                title={ action === "Add" ? "Add Device" : "Edit Device" }
                visible={isModalVisible} 
                onCancel={handleCancel}
                footer={null}
                width={400}
                destroyOnClose={true}
            >
                <Formik
                    initialValues={ action === "Add" ? {
                            customerId: customerData.id,
                            devicetype: undefined,
                            deviceId: undefined,
                            active: 1
                        } :
                        {
                            id: editDeviceRecord.id,
                            customerId: customerData.id,
                            devicetype: editDeviceRecord.devicetype,
                            deviceId: editDeviceRecord.deviceId,
                            active: editDeviceRecord.active
                        }
                    }
                    validationSchema={validationSchema}
                    onSubmit={(fields) => {
                        if(action === "Add"){
                        handleAddDevice(fields);
                        } else {
                        handleEditDevice(fields);
                        }
                    }}
                    >
                    {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                        <Form
                        layout="vertical"
                        onSubmit={handleSubmit}
                        >
                                <Form.Item label="Device Type" htmlFor="devicetype" required>
                                    <Select 
                                        name="devicetype" 
                                        type="text"
                                        value={values.devicetype} 
                                        onChange={item => setFieldValue("devicetype", item)}
                                        onBlur={handleBlur}
                                        placeholder="Select Device"
                                    >
                                        <Select.Option value="Web">Web</Select.Option>
                                        <Select.Option value="Mobile">Mobile</Select.Option>
                                        <Select.Option value="TV">TV</Select.Option>
                                    </Select>
                                    <ErrorMessage name="devicetype" component="div" className="invalid-feedback"/>
                                </Form.Item>
                                <Form.Item label="Device Id" htmlFor="deviceId" required>
                                    <Input name="deviceId" type="text" value={values.deviceId} onChange={handleChange} onBlur={handleBlur} 
                                        className={
                                            "form-control" +
                                            (errors.deviceId && touched.deviceId
                                            ? " is-invalid"
                                            : "")
                                        }
                                        placeholder="Enter Device Id"
                                    />
                                    <ErrorMessage name="deviceId" component="div" className="invalid-feedback"/>
                                </Form.Item>
                                <Form.Item label="Active" required>
                                <Select 
                                    name="active"
                                    value={values.active} 
                                    placeholder="select genre state"
                                    onChange={(value) =>setFieldValue ("active",value)}
                                    allowClear
                                    className={"form-control" + (errors.active && touched.active ? " is-invalid" : "")}
                                    >
                                    <Select.Option value={1} key={1}>Enable</Select.Option>
                                    <Select.Option value={0} key={0}>Disable</Select.Option>
                                    </Select>
                                <ErrorMessage name="active" component="div" className="invalid-feedback" />
                                </Form.Item>
                        <Divider span={24} />
                        <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <Col style={{ paddingLeft: "10px" }}>
                                <Form.Item>
                                    <Button type="primary" onClick={handleSubmit}>Submit</Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        </Form>
                    )}
                    </Formik>
            </Modal>
        </div>
    )
}
