import React, { useState } from "react";

import { Layout, Radio } from "antd";
import "antd/dist/antd.css";

import AddUser from "./add/AddUser";
import DeleteUser from "./delete/DeleteUser";
import UpdateUser from "./update/UpdateUser";

const { Content } = Layout;

const options = [
  {
    label: 'Add User',
    value: 'Add User'
  },
  {
    label: 'Delete User',
    value: 'Delete User'
  },
  {
    label: 'Update User',
    value: 'Update User'
  },
];

export default function User({ setHeaderKey }) {
  setHeaderKey('user');
  
  const [value, setValue] = useState('Add User');

  function onChange(event) {
    setValue(event.target.value);
  };

  return (
    <Layout
      style={{
        padding: '24px 24px',
      }}
    >
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />

      <Content>
        <RenderSwitch option={value} />
      </Content>
    </Layout>
  );
}

function RenderSwitch({ option }) {
  switch (option) {
    case 'Add User':
      return <AddUser />;
    case 'Delete User':
      return <DeleteUser />;
    case 'Update User':
      return <UpdateUser />
    default:
      return <h1>Error</h1>;
  }
}
