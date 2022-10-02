import React from "react";

import { Descriptions } from "antd";
import "antd/dist/antd.css";

export default function UserDescription({ userData }) {
  return (
    <Descriptions
      title="User Info"
      bordered
      column={{
        xxl: 4,
        xl: 3,
        lg: 3,
        md: 3,
        sm: 2,
        xs: 1,
      }}
    >
      <Descriptions.Item label="User ID">{userData.id || "User ID"}</Descriptions.Item>
      <Descriptions.Item label="Username">{userData.username || "Username"}</Descriptions.Item>
      <Descriptions.Item label="Roles">{
        userData.roles ?
          <ul>
            {userData.roles.map((role) => <li>{role.name}</li>)}
          </ul>
          :
          "Publication Date"
      }</Descriptions.Item>
    </Descriptions>
  );
};
