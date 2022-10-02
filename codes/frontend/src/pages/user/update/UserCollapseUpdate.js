import React, { useState } from "react";

import { Button, Collapse, Form, Input, notification, Table } from "antd";
import "antd/dist/antd.css";

import { BOOK_COLUMNS } from "../../../globals/GlobalVariables";

const { Panel } = Collapse;

export default function UserCollapseUpdate({ user, handleUpdate }) {
  const [isUpdateUser, setIsUpdateUser] = useState(false);

  function handleUserUpdateFormFinish({ password }) {
    handleUpdate(user.id, password);
    setIsUpdateUser(false);
  };

  function handleUserUpdateFormFinishFailed() {
    const config = {
      description: 'User could not be updated! Try again!',
      duration: 4.5,
      key: 'search-user-by-username-not-found-error',
      message: 'Update is not successful! ',
      placement: 'top'
    }

    notification.error(config);

    setIsUpdateUser(false);
  }

  return (
    <Collapse>
      <Panel header={`${user.username}`} key={user.id}>
        <p>This is the data of {user.username}.</p>
        <Collapse ghost>
          <Panel header="Read List" key="readList">
            <Table
              bordered
              columns={BOOK_COLUMNS}
              dataSource={user.readList}
            />
          </Panel>
          <Panel header="Favorite List" key="favoriteList">
            <Table
              bordered
              columns={BOOK_COLUMNS}
              dataSource={user.favoriteList}
            />
          </Panel>
          <Panel header="Roles" key="roles">
            {
              user.roles &&
              <ul>
                {
                  user.roles.map((item) => {
                    return <li key={item.id}>{item.name}</li>
                  })
                }
              </ul>
            }
          </Panel>
        </Collapse>

        <Button
          type="primary"
          htmlType="submit"
          onClick={() => setIsUpdateUser(!isUpdateUser)}
        >
          {isUpdateUser ? 'Close' : 'Update User'}
        </Button>

        {isUpdateUser &&
          <UserUpdateForm
            onFinish={handleUserUpdateFormFinish}
            onFinishFailed={handleUserUpdateFormFinishFailed}
          />
        }
      </Panel>
    </Collapse>
  );
}

function UserUpdateForm({ onFinish, onFinishFailed }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="updateUser"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="password"
        label="Password"
        rules={[{
          required: true,
          message: "Please input your password!"
        }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
}
