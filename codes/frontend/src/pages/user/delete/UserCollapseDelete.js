import React from "react";

import { Button, Collapse, Popconfirm, Table } from "antd";
import "antd/dist/antd.css";

import { BOOK_COLUMNS } from "../../../globals/GlobalVariables";

const { Panel } = Collapse;

export default function UserCollapse({ user, handleDelete }) {
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

        <Popconfirm
          title="Are you sure to delete the user?"
          onConfirm={() => handleDelete(user.id)}
        >
          <Button
            type="primary"
            htmlType="submit"
          >
            Delete User
          </Button>
        </Popconfirm>
      </Panel>
    </Collapse>
  );
}
