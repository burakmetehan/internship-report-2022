import React from "react";

import { Descriptions } from "antd";
import "antd/dist/antd.css";

export default function BookDescription({ bookData }) {
  return (
    <Descriptions
      title="Book Info"
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
      <Descriptions.Item label="Book ID">{bookData.id || "Book ID"}</Descriptions.Item>
      <Descriptions.Item label="Book Name">{bookData.name || "Book Name"}</Descriptions.Item>
      <Descriptions.Item label="Author">{bookData.author || "Author"}</Descriptions.Item>
      <Descriptions.Item label="Page Count">{bookData.pageCount || "Page Count"}</Descriptions.Item>
      <Descriptions.Item label="Type">{bookData.type || "Type"}</Descriptions.Item>
      <Descriptions.Item label="Publisher">{bookData.publisher || "Publisher"}</Descriptions.Item>
      <Descriptions.Item label="Publication Date">{bookData.publicationDate || "Publication Date"}</Descriptions.Item>
    </Descriptions>
  );
};
