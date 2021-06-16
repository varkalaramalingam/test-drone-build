import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Form, Row, Col, Input, Select, DatePicker, Button, Divider } from "antd";
import { Formik, ErrorMessage } from "formik"
import moment from "moment"
import { io } from '../../api/io';
import * as yup from "yup";
import { personaId } from "../../components/reusable/validations/Regex"
import BackButton from '../../components/BackButton';

function NewCustomer() {
    const validationSchema = yup.object({
        personaId: yup.string()
            .matches(personaId, "Must contain atleast 6 alphabets, 3 digits"),
        clientReferenceId: yup.string()
            .matches(personaId, "Must contain atleast 6 alphabets, 3 digits"),
        subscriptionType: yup.string()
            .required("required"),
        subscriptionStartDate: yup.string()
            .required("required"),
        subscriptionEndDate: yup.string()
            .required("required"),
        primaryLanguage: yup.string()
            .required("required"),
        zipcode: yup.string()
            .required("required"),
        active: yup.string()
            .required("required"),
    });

    const history = useHistory();
    const location = useLocation();
    const formData = location.state.customerData;
    const startDate = moment(formData.subscriptionStartDate);
    const endDate = moment(formData.subscriptionEndDate);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        getLanguages();
    }, []);

    const getLanguages = () => {
        io({ method: "get", url: '/api/language' })
        .then(({ data : { resultsMap : { result = [] }} } = {}) => {
          console.log(result);
          setLanguages(result);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSubmitForAdd = (fields) => {
        console.log(fields);
        io({ url:`/api/customer`, 
             method: "post", 
             data: fields
        })
            .then((response) =>{
                console.log(response);
                history.push({ pathname: "/users" });
            }).catch((err) => {
                console.log("error", err);
            })
    }
    
    const handleSubmitForEdit = (fields) => {
        io({ url:`/api/customer/${formData.id}`, 
             method: "patch", 
             data: fields
        })
            .then((response) =>{
                console.log(response);
                history.push({ pathname: "/users" });
            }).catch((err) => {
                console.log("error", err);
            })
    }

    return (
        <div>
            <BackButton pageName={ location.pathname==="/user/adduser" ? "Add User" : "Edit User"}/>
            <Formik
                initialValues={{
                  personaId: formData?.personaId || "",
                  clientReferenceId: formData?.clientReferenceId || "",
                  subscriptionType: formData?.subscriptionType || "free",
                  subscriptionStartDate: startDate || undefined,
                  subscriptionEndDate: endDate || undefined,
                  locality: formData?.locality || undefined,
                  location: formData?.location || undefined,
                  listOfDeviceType: formData?.listOfDeviceType || undefined,
                //   deviceID: formData?.deviceID || undefined,
                  personaCategory: formData?.personaCategory || undefined,
                  primaryLanguage: formData?.primaryLanguage || undefined,
                  city: formData?.city || undefined,
                  state: formData?.state || undefined,
                  country: formData?.country || undefined,
                  zipcode: formData?.zipcode || undefined,
                  active: formData?.active?.toString() || "1",
                }}
                validationSchema={validationSchema}
                onSubmit={(fields) => {
                    formData.id ? handleSubmitForEdit(fields) : handleSubmitForAdd(fields)
                }}
              >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                    <Form
                        layout="vertical"
                        className="content-edit"
                        onSubmit={handleSubmit}
                    >
                        <Row>
                            <Col span={12} style={{ paddingRight: "5px" }}>
                                <Form.Item label="Client Reference Id" htmlFor="clientReferenceId">
                                    <Input name="clientReferenceId" type="text" value={values.clientReferenceId} onChange={handleChange} onBlur={handleBlur} 
                                        className={
                                            "form-control" +
                                            (errors.clientReferenceId && touched.clientReferenceId
                                            ? " is-invalid"
                                            : "")
                                        }
                                        placeholder="Enter Client Reference Id"
                                    />
                                    <ErrorMessage name="clientReferenceId" component="div" className="invalid-feedback"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Subscription Type" htmlFor="subscriptionType" required>
                                    <Select 
                                        name="subscriptionType" 
                                        type="text"
                                        value={values.subscriptionType} 
                                        onChange={item => setFieldValue("subscriptionType", item)}
                                        onBlur={handleBlur}
                                        className={
                                            "form-control" +
                                            (errors.subscriptionType && touched.subscriptionType
                                              ? " is-invalid"
                                              : "")    
                                            }
                                    >
                                        <Select.Option value="free" label="free">Free</Select.Option>
                                        <Select.Option value="premium" label="premium">Premium</Select.Option>
                                    </Select>
                                    <ErrorMessage name="subscriptionType" component="div" className="invalid-feedback"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ paddingRight: "5px" }}>
                                <Form.Item label="Persona Category" htmlFor="personaCategory">
                                    <Select 
                                        name="personaCategory" 
                                        type="text"
                                        value={values.personaCategory} 
                                        onChange={item => setFieldValue("personaCategory", item)}
                                        onBlur={handleBlur}
                                        placeholder="Select Persona Category"
                                    >
                                        <Select.Option value="New">New</Select.Option>
                                        <Select.Option value="Existing">Existing</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Start Date" htmlFor="subscriptionStartDate" required>
                                    <DatePicker 
                                        name="subscriptionStartDate" 
                                        type="date"
                                        value={values.subscriptionStartDate}
                                        onChange={item => setFieldValue("subscriptionStartDate", item)}
                                        onBlur={handleBlur}
                                    />
                                    <ErrorMessage name="subscriptionStartDate" component="div" className="invalid-feedback"/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="End Date" htmlFor="subscriptionEndDate" required>
                                    <DatePicker 
                                        name="subscriptionEndDate" 
                                        type="date"
                                        value={values.subscriptionEndDate}
                                        onChange={item => setFieldValue("subscriptionEndDate", item)}
                                        onBlur={handleBlur}
                                    />
                                    <ErrorMessage name="subscriptionEndDate" component="div" className="invalid-feedback"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ paddingRight: "5px" }}>
                                <Form.Item label="Device Type" htmlFor="listOfDeviceType">
                                    <Select 
                                        name="listOfDeviceType" 
                                        type="text"
                                        mode="multiple"
                                        value={values.listOfDeviceType} 
                                        onChange={item => {
                                            setFieldValue("listOfDeviceType", item)
                                            console.log(item)
                                        }}
                                        onBlur={handleBlur}
                                        placeholder="Select Devices"
                                    >
                                        <Select.Option value="Web">Web</Select.Option>
                                        <Select.Option value="Mobile">Mobile</Select.Option>
                                        <Select.Option value="Tv">Tv</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Primary Language" htmlFor="primaryLanguage" required>
                                    <Select 
                                        name="primaryLanguage"
                                        type="text" 
                                        value={values.primaryLanguage} 
                                        onChange={item => setFieldValue("primaryLanguage", item)}
                                        onBlur={handleBlur}
                                        className={
                                            "form-control" +
                                            (errors.subscriptionType && touched.subscriptionType
                                              ? " is-invalid"
                                              : "")    
                                            }
                                        placeholder="Select Primary Language"
                                    >
                                        { languages.map( lang => (
                                            <Select.Option value={lang.language} key={lang.id}>{lang.language}</Select.Option>
                                        ))}
                                        {/* <Select.Option value="Telugu">Telugu</Select.Option> */}
                                        {/* <Select.Option value="Hindi">Hindi</Select.Option>
                                        <Select.Option value="English">English</Select.Option> */}
                                    </Select>
                                    <ErrorMessage name="primaryLanguage" component="div" className="invalid-feedback"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ paddingRight: "5px" }}>
                                <Form.Item label="Locality" htmlFor="locality">
                                    <Input name="locality" type="text" value={values.locality} onChange={handleChange} placeholder="Enter Locality"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Location" htmlFor="location">
                                    <Input name="location" type="text" value={values.location} onChange={handleChange} placeholder="Enter Location"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ paddingRight: "5px" }}>
                                <Form.Item label="City" htmlFor="city">
                                    <Input name="city" type="text" value={values.city} onChange={handleChange} placeholder="Enter City"/>
                                </Form.Item>
                            </Col>
                        
                            <Col span={12}>
                                <Form.Item label="State" htmlFor="state">
                                    <Input name="state" type="text" value={values.state} onChange={handleChange} placeholder="Enter State"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ paddingRight: "5px" }}>
                                <Form.Item label="Country" htmlFor="country">
                                    <Input name="country" type="text" value={values.country} onChange={handleChange} placeholder="Enter Country"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Zipcode" htmlFor="zipcode" required>
                                    <Input name="zipcode" type="text" value={values.zipcode} onChange={handleChange} onBlur={handleBlur}
                                        className={
                                            "form-control" +
                                            (errors.subscriptionType && touched.subscriptionType
                                              ? " is-invalid"
                                              : "")    
                                            }
                                        placeholder="Enter Zipcode"
                                    />
                                    <ErrorMessage name="zipcode" component="div" className="invalid-feedback"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider />
                        <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <Col style={{ paddingLeft: "10px" }}>
                                <Form.Item>
                                    <Button type="primary" onClick={handleSubmit}>Submit</Button>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item>
                                    <Button><Link to="/users">Cancel</Link></Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default NewCustomer
