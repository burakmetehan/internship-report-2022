import React, { useState } from "react";

import { Button, Collapse, Form, Input, InputNumber, notification } from "antd";
import "antd/dist/antd.css";

import BookDescription from "../util/BookDescription";

const { Panel } = Collapse;

export default function BookCollapseUpdate({ book, handleUpdate }) {
  const [isUpdateBook, setIsUpdateBook] = useState(false);

  function handleBookUpdateFormFinish({ pageCount, publisher, publicationDate }) {
    if (pageCount == null || pageCount == undefined) {
      pageCount = 0;
    }

    if (publisher == null || publisher == undefined) {
      publisher = "";
    }

    if (publicationDate == null || publicationDate == undefined) {
      publicationDate = "";
    }

    handleUpdate(book.id, book.key, pageCount, publisher, publicationDate);
    setIsUpdateBook(false);
  };

  function handleBookUpdateFormFinishFailed() {
    const config = {
      message: 'Update is not successful! ',
      description: 'Book could not be updated! Try again!',
      duration: 4.5,
      key: 'handle-book-update-form-failed-error',
      placement: 'top'
    }

    notification.error(config);

    setIsUpdateBook(false);
  }

  return (
    <Collapse>
      <Panel header={`${book.name}`} key={book.id}>
        <p>This is the data of {book.name}.</p>

        <BookDescription bookData={book} />

        <Button
          type="primary"
          htmlType="submit"
          onClick={() => setIsUpdateBook(!isUpdateBook)}
        >
          {isUpdateBook ? 'Close' : 'Update Book'}
        </Button>

        {isUpdateBook &&
          <BookUpdateForm
            onFinish={handleBookUpdateFormFinish}
            onFinishFailed={handleBookUpdateFormFinishFailed}
          />
        }
      </Panel>
    </Collapse>
  );
}

function BookUpdateForm({ onFinish, onFinishFailed }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="updateBook"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        pageCount: 0,
        publisher: "",
        publicationDate: ""
      }}
    >
      <Form.Item label="Page Count" name="pageCount">
        <InputNumber
          min={0}
          id="pageCount"
          name="pageCount"
          controls={false}
          placeholder="Page Count"
        />
      </Form.Item>

      <Form.Item label="Publisher" name="publisher">
        <Input
          id="publisher"
          name="publisher"
          placeholder="Publisher"
        />
      </Form.Item>

      <Form.Item label="Publication Date" name="publicationDate">
        <Input
          type="date"
          id="publicationDate"
          name="publicationDate"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}