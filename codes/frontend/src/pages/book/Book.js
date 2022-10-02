import React, { useState } from "react";

import { Layout, Radio } from "antd";

import AddBook from "./add/AddBook";
import DeleteBook from "./delete/DeleteBook";
import BookList from "./list/BookList";
import UpdateBook from "./update/UpdateBook";

const { Content } = Layout;

export default function Book({ setHeaderKey, admin }) {
  setHeaderKey('book');

  const [radioValue, setRadioValue] = useState('Book List');
  const options = admin ? [
    {
      label: 'Add Book',
      value: 'Add Book'
    },
    {
      label: 'Delete Book',
      value: 'Delete Book'
    },
    {
      label: 'Update Book',
      value: 'Update Book'
    },
    {
      label: 'Book List',
      value: 'Book List'
    }
  ] : [{
    label: 'Book List',
    value: 'Book List'
  }];

  function handleRadioChange(event) {
    setRadioValue(event.target.value);
  };

  return (
    <Layout
      style={{
        padding: '24px 24px 24px',
      }}
    >
      <Radio.Group
        options={options}
        onChange={handleRadioChange}
        value={radioValue}
        optionType="button"
        buttonStyle="solid"
      />

      <Content>
        <RenderSwitch option={radioValue} />
      </Content>
    </Layout>
  );
}

function RenderSwitch({ option }) {
  switch (option) {
    case 'Add Book':
      return <AddBook />;
    case 'Update Book':
      return <UpdateBook />
    case 'Delete Book':
      return <DeleteBook />;
    case 'Book List':
      return <BookList />
    default:
      return <h1>Error</h1>;
  }
}
