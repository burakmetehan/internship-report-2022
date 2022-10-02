import React from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import "antd/dist/antd.css";
import "../../index.css";

import { _login } from "../../service/AuthService";

export default function Login({ setIsAuthenticated, setAdmin }) {

  async function handleLoginFormFinish({ username, password, remember }) {
    const response = await _login({ username, password });
    const { isAdmin, isValid, token } = response;

    if (!response.successful || !isValid) { // Not Successful
      const config = {
        description: 'Check your credentials and try again!',
        duration: 4.5,
        key: 'login-credential-error',
        message: 'Wrong username or password!',
        placement: 'top'
      }

      notification.error(config);
      setIsAuthenticated(false);
      return;
    }

    if (remember) {
      localStorage.setItem("Authorization", token);
      localStorage.setItem("Username", response.username);
    }

    sessionStorage.setItem("Authorization", token);
    sessionStorage.setItem("Username", response.username);

    setAdmin(isAdmin);
    setIsAuthenticated(true);
  };

  return (
    <div className="login-form-div">

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={handleLoginFormFinish}
      >
        <Form.Item
          name="header"
          className="login-form-header"
        >
          <h1>Login Book Portal</h1>
        </Form.Item>

        <Form.Item
          className="login-form-item"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            className="login-form-input"
            id="username"
            name="username"
            placeholder="Username"
            prefix={<UserOutlined className="login-form-icon" />}
          />
        </Form.Item>

        <Form.Item
          className="login-form-item"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            className="login-form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            prefix={<LockOutlined className="login-form-icon" />}
          />
        </Form.Item>

        <Form.Item
          className="login-form-item"
          name="remember"
          valuePropName="checked"
          noStyle
        >
          <Checkbox
            className="login-form-checkbox"
          >
            Remember me
          </Checkbox>
        </Form.Item>

        <Form.Item
          className="login-form-item-button"
        >
          <Button
            type="primary"
            htmlType="submit" className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};