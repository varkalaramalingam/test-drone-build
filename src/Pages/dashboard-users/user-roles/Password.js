import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { io } from "../../../api/io";

function Password({ userId, credentialsId }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const [inputText, setInputText] = useState({
    createdOn: 0,
    modifiedOn: 0,
    password: "",
    userId: userId,
  });

  const onUpdatePassword = () => {
    io({
      method: "post",
      url: credentialsId !== 0 ? `/api/user/credentials/${credentialsId}` : `/api/user/credentials` ,
      data: inputText,
    })
      .then((response) => {
        message.success(`Password updated successfully`);
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{float:"left", marginRight:"10px"}}>
      {credentialsId !== 0 ? "Change Password" : "Generate Password"}
      </Button>
      <Modal
        title="Change Password"
        destroyOnClose={true}
        width={400}
        visible={isModalVisible}
        footer={false}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onUpdatePassword}
        >
        <Form.Item
          label="Password"
          name="password"
          value={inputText.password}
          rules={[{ required: true }]}
        >
          <Input.Password
            placeholder="Enter password"
            onChange={(e) =>
              setInputText({ ...inputText, password: e.target.value })
            }
          />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords are not same!');
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Password;
