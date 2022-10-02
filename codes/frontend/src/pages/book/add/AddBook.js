import React, { useState } from "react";

import { notification } from "antd";
import "antd/dist/antd.css";

import BookDescription from "../util/BookDescription";
import BookForm from "./BookForm";

import { _addBook } from "../../../service/BookService";
import { BookListParser } from "../util/BookContentParser";

export default function AddBook() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    pageCount: 0,
    type: "",
    publisher: "",
    publicationDate: ""
  })
  const [bookData, setBookData] = useState({
    id: 0,
    name: "",
    author: "",
    pageCount: 0,
    type: "",
    publisher: "",
    publicationDate: ""
  });

  /* ========== Event Listener Functions ========== */
  function handleBookDataChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleBookFormFinish() {
    const response = await _addBook(formData);

    if (!response.successful) {
      const config = {
        message: 'Please, fill the all necessary fields!',
        description: '',
        duration: 4.5,
        key: 'add-book-error',
        placement: 'top'
      }

      notification.error(config);

      setIsSuccessful(false);
      return;
    }

    const config = {
      message: 'Book is added!',
      description: 'Book is successfully added!',
      duration: 4.5,
      key: 'add-book-success',
      placement: 'top'
    }

    notification.success(config);

    const newContent = BookListParser(response.data);

    setIsSuccessful(true);
    setBookData(newContent[0]);
  }

  function handleBookFormFail() {
    const config = {
      description: '',
      duration: 4.5,
      key: 'add-book-form-error',
      message: 'Please, fill the all necessary fields!',
      placement: 'top'
    }

    notification.error(config);
    setIsSuccessful(false);
    return;
  }

  return (
    <div>
      <BookForm
        bookData={bookData}
        handleBookDataChange={handleBookDataChange}
        handleBookFormFinish={handleBookFormFinish}
        onBookFormFail={handleBookFormFail}
      />

      {
        isSuccessful ? <BookDescription bookData={bookData} /> : null
      }

    </div>
  );
};
