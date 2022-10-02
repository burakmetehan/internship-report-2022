import React, { useEffect, useState } from "react";

import { UserOutlined } from '@ant-design/icons';
import {
  Alert, Avatar, Button, Card, Collapse,
  Descriptions, Form, Input, Layout, notification, Table
} from 'antd';
import "antd/dist/antd.css";

import { _searchUserByUsernameList, _updateUser } from "../service/UserService";

import { BOOK_COLUMNS } from "../globals/GlobalVariables";

const { Content } = Layout;
const { Panel } = Collapse;

export default function Home({ setIsAuthenticated, setHeaderKey }) {
  setHeaderKey('home');

  return (
    <Layout>
      <HomeContent setIsAuthenticated={setIsAuthenticated} />
    </Layout>
  );
}

function HomeContent({ setIsAuthenticated }) {
  const [userData, setUserData] = useState({});
  const [isChangePassword, setIsChangePassword] = useState(false);

  /* ========== Use Effect ========== */
  useEffect(() => {
    async function getUserData() {
      const response = await _searchUserByUsernameList({
        username: sessionStorage.getItem('Username')
      });

      if (!response.successful) { // Not successful
        localStorage.clear();
        sessionStorage.clear();

        setIsAuthenticated(false);

        return;
      }

      let user = response.data && response.data[0];
      
      const readList = user.readList.map((book) => {
        return {
          ...book,
          publicationDate: book.publicationDate.slice(0, 10)
        }
      });

      const favoriteList = user.favoriteList.map((book) => {
        return {
          ...book,
          publicationDate: book.publicationDate.slice(0, 10)
        }
      });

      user = {
        ...user,
        readList: readList,
        favoriteList: favoriteList
      }

      setUserData(user);
    }

    getUserData();
  }, [])

  /* ========== Password Change ========== */
  async function passwordChange({ password }) {
    const response = await _updateUser({ userId: userData.id, newPassword: password });

    if (!response.successful) { // Not successful
      const config = {
        description: 'Password Change Error!',
        duration: 4.5,
        key: 'password-change-error',
        message: 'An error happened in password change! Please log in and try again!',
        placement: 'top'
      }

      notification.error(config);
    } else {
      const config = {
        description: 'Your password is changed successfully!',
        duration: 4.5,
        key: 'password-change-success',
        message: 'Password is changed!',
        placement: 'top'
      }

      notification.success(config);
    }

    localStorage.clear();
    sessionStorage.clear();

    setIsAuthenticated(false);
  }

  /* ========== Event Listeners ========== */
  function onUserUpdateFormFinish({ password }) {
    passwordChange({ password });
    setIsChangePassword(false);
  };

  function onClickPasswordChangeButton() {
    setIsChangePassword(!isChangePassword);
  }

  /* ========== Info Part ========== */
  function HomeInfo() {
    return (
      <Card
        title={<HomeAvatar />}
        bordered={false}
      >
        <Descriptions
          bordered
        >
          <Descriptions.Item label="User Id">{userData.id || null}</Descriptions.Item>
        </Descriptions>

        <Collapse ghost>
          <Panel header="Read List" key="readList">
            <Table
              bordered
              columns={BOOK_COLUMNS}
              dataSource={userData.readList}
            />
          </Panel>
          <Panel header="Favorite List" key="favoriteList">
            <Table
              bordered
              columns={BOOK_COLUMNS}
              dataSource={userData.favoriteList}
            />
          </Panel>
          <Panel header="Roles" key="roles">
            {
              userData.roles &&
              <ul>
                {
                  userData.roles.map((item) => {
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
          onClick={onClickPasswordChangeButton}
        >
          {isChangePassword ? 'Cancel' : 'Change Password'}
        </Button>

        {
          isChangePassword && <UserUpdateForm onUserUpdateFormFinish={onUserUpdateFormFinish} />
        }
      </Card>
    );
  }

  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <HomeInfo />
    </Content>
  );
}

function UserUpdateForm({ onUserUpdateFormFinish }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="updateUser"
      onFinish={onUserUpdateFormFinish}
      onFinishFailed={() => console.log("Fail")}
    >
      <Form.Item>
        <Alert
          message="Warning"
          description="When password is changed, you will be logged out!"
          type="warning"
          showIcon
          closable
        />
      </Form.Item>
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
          Confirm Password Change
        </Button>
      </Form.Item>

    </Form >
  );
}

function HomeAvatar() {
  return (
    <div className="home-avatar">
      <Avatar
        style={{
          backgroundColor: '#87d068',
        }}
        size="large"
        icon={<UserOutlined />}
      />
      Hello <b>{sessionStorage.getItem('Username')}</b>
    </div>
  );
}
