import React from "react";

import { Button, Col, Form, Input, InputNumber, Radio, Row } from "antd";
import "antd/dist/antd.css";

export default function UserSearch({
  userId, setUserId, handleUserSearchById,
  username, setUsername, handleUserSearchByUsername,
  radioValue, handleRadioValueChange
}) {
  function handleUserIdChange(newId) {
    if (newId) {
      setUserId(newId);
    } else {
      setUserId(0);
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  return (
    <>
      <Radio.Group
        options={searchOptions}
        onChange={handleRadioValueChange}
        value={radioValue}
        optionType="default"
      />
      <div className='search-forms'>
        <Row>
          {
            radioValue === "Search User By ID" ?
              <Col span={12}>
                <Form
                  onFinish={handleUserSearchById}
                  onFinishFailed={() => console.log("Failed in Search User By Id!")}
                >
                  <Form.Item
                    label="Search User By Id"
                    rules={[{ message: 'Please input an integer greater than or equal to 0!' }]}
                  >
                    <InputNumber
                      min={0}
                      id="userId"
                      name="userId"
                      value={userId}
                      onChange={handleUserIdChange}
                    />

                    <Button type="primary" htmlType="submit">
                      Search
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              :
              <Col span={12}>
                <Form
                  onFinish={handleUserSearchByUsername}
                  onFinishFailed={() => console.log("Failed in Search User By Name!")}
                >
                  <Form.Item
                    label="Search User By Name"
                    rules={[{ message: 'Please input username' }]}
                  >
                    <Input
                      id="username"
                      name="username"
                      value={username}
                      onChange={handleUsernameChange}
                    />

                    <Button type="primary" htmlType="submit">
                      Search
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
          }
        </Row>
      </div>
    </>
  );
}

const searchOptions = [
  {
    label: "Search User By ID",
    value: "Search User By ID"
  },
  {
    label: "Search User By Username",
    value: "Search User By Username"
  }
];
