import React from "react";

import { Button, Col, Form, Input, InputNumber, Radio, Row } from "antd";
import "antd/dist/antd.css";

export default function UserSearch({
  bookId, setBookId, handleBookSearchById,
  bookName, setBookName, handleBookSearchByName,
  radioValue, handleRadioValueChange
}) {
  function handleBookIdChange(newId) {
    if (newId) {
      setBookId(newId);
    } else {
      setBookId(0);
    }
  }

  function handleBookNameChange(event) {
    setBookName(event.target.value);
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
            radioValue === "Search Book By ID" ?
              <Col span={12}>
                <Form
                  onFinish={handleBookSearchById}
                  onFinishFailed={() => console.log("Failed in Search Book By Id!")}
                >
                  <Form.Item
                    label="Search Book By Id"
                    rules={[{ message: 'Please input an integer greater than or equal to 0!' }]}
                  >
                    <InputNumber
                      min={0}
                      id="bookId"
                      name="bookId"
                      value={bookId}
                      onChange={handleBookIdChange}
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
                  onFinish={handleBookSearchByName}
                  onFinishFailed={() => console.log("Failed in Search Book By Name!")}
                >
                  <Form.Item
                    label="Search Book By Name"
                    rules={[{ message: 'Please input username' }]}
                  >
                    <Input
                      id="bookName"
                      name="bookName"
                      value={bookName}
                      onChange={handleBookNameChange}
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
    label: "Search Book By ID",
    value: "Search Book By ID"
  },
  {
    label: "Search Book By Name",
    value: "Search Book By Name"
  }
];
