import React, { useState } from "react";

import { Button, Form, Input, notification } from "antd";
import "antd/dist/antd.css";

import UserDescription from "../util/UserDescription";

import { _addUser } from "../../../service/UserService";

export default function AddUser() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    id: 0,
    roles: []
  });
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  /* ========== Event Listener Functions ========== */
  async function handleFormFinish() {
    const response = await _addUser({
      username: formData.username,
      password: formData.password
    });

    if (!response.successful) {
      const config = {
        description: 'Check Info!',
        duration: 4.5,
        key: 'on-finish-error',
        message: 'Check Info! Re-enter and try again!',
        placement: 'top'
      }

      notification.error(config);
      setIsSuccessful(false);

      return;
    }

    setIsSuccessful(true);
    setUserData(response.data);
    setFormData({ username: "", password: "" })
  }

  function handleFormFinishFailed() {
    const config = {
      description: 'User could not be added! User may already be added or provided information is errornous!',
      duration: 4.5,
      key: 'add-user-finish-fail-error',
      message: 'Check user information!',
      placement: 'top'
    }

    notification.error(config);
    setIsSuccessful(false);

    return;
  }

  function handleUserDataChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  /* ========== Return ========== */
  return (
    <div className="add-user">
      <Form
        onFinish={handleFormFinish}
        onFinishFailed={handleFormFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{
            required: true,
            message: 'Please input your username!'
          },
          ]}
        >
          <Input
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleUserDataChange}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{
            required: true,
            message: 'Please input your password!',
          },
          ]}
        >
          <Input.Password
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleUserDataChange}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {
        isSuccessful &&
        <UserDescription userData={userData} />
      }
    </div>
  );
}