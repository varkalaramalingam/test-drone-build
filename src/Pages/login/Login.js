import React from 'react'
import { Form, Input, Row, Col, Button, Divider, message } from "antd"
import { Formik, ErrorMessage } from "formik"
import { io } from '../../api/io';
import * as yup from "yup";
import { useHistory } from "react-router";
import contelligenz from "../../assets/contelligenz.png";


function Login({ loggedIn, setAppUserName, setAppUserRole, setAuthToken }) {
    const history = useHistory()

    const login = (fields) => {
        console.log(fields)
        const payload = {
            emailid: fields.userName,
            password: fields.password
        }
        io({ url: "/login", method: "post", data: payload })
            .then(({ data = [] } = {}) => {
                console.log(data)
                localStorage.setItem("isAuthenticated", true)
                localStorage.setItem("authToken", data.authToken)
                localStorage.setItem("username", data.username)
                setAppUserName(data.username)
                setAppUserRole(data.userrole)
                setAuthToken(data.authToken)
                loggedIn()
                history.push({ pathname: "/dashboard-accounts" });
            })
            .catch((err) => {
                console.log(err)
                message.error("Username or password is incorrect")
            })
    }

    const validationSchema = yup.object().shape({
        userName: yup.string().required("required"),
        password: yup.string().required("required"),
      });

    return (
        <div 
            className="login-set"
            style={{
                justifyContent: "center",
                display: "flex",
                marginTop: "150px",
            }}
        >
            
            <Formik
                initialValues={{
                    userName: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(fields) => {
                    login(fields)
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
                <Form
                    layout="vertical"
                    className="content-edit"
                    onFinish={handleSubmit}
                    style={{ width: "450px", verticalAlign: "center" }}
                >
                    <Row>
                        <Col span={12}><h2>Login</h2></Col>
                        <Col span={12} push={10}><img src={contelligenz} alt="contelligenz" width="30px" height="30px" /></Col>       
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24} style={{ paddingRight: "5px" }}>
                            <Form.Item label="Username" htmlFor="userName" required>
                                <Input name="userName" type="text" value={values.userName} onChange={handleChange} onBlur={handleBlur} 
                                    className={
                                        "form-control" +
                                        (errors.userName && touched.userName
                                        ? " is-invalid"
                                        : "")
                                    }
                                    placeholder="Enter Username"
                                    allowClear
                                />
                                <ErrorMessage name="userName" component="div" className="invalid-feedback"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Password" required >
                                <Input.Password name="password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} 
                                    className={
                                        "form-control" +
                                        (errors.password && touched.password
                                        ? " is-invalid"
                                        : "")
                                    }
                                    placeholder="Enter password"
                                    allowClear
                                />
                                <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login
