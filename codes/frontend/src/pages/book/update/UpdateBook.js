import React, { useEffect, useState } from "react";

import { notification, Pagination } from "antd";
import "antd/dist/antd.css";

import { BookContentParser, BookListParser } from "../util/BookContentParser";
import BookSearch from "../util/BookSearch";
import BookCollapseUpdate from "./BookCollapseUpdate";

import { _searchAllBooks, _searchBookById, _searchBooksByName, _updateBook } from "../../../service/BookService";

import { PAGINATION } from "../../../globals/GlobalVariables";

export default function UpdateUser() {
  const [bookId, setBookId] = useState(0);
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([{
    id: 0,
    key: 0,
    name: "",
    author: "",
    pageCount: 0,
    type: "",
    publisher: "",
    publicationDate: ""
  }]);
  const [radioValue, setRadioValue] = useState("Search Book By ID");
  const [pagination, setPagination] = useState(PAGINATION);
  // isSearch makes use of the fact that '0: false, others: true'
  const [isSearch, setIsSearch] = useState(0);

  /* ========== Use Effect Functions ========== */
  useEffect(() => {
    async function searchAllBooks() {
      const response = await _searchAllBooks(PAGINATION); // searching books

      if (!response.successful) { // Not successful
        const config = {
          message: 'Book could not be loaded!',
          description: 'An error happened while trying to load books! Please try later!',
          duration: 4.5,
          key: 'search-all-book-error',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const newBooks = BookContentParser(response.content);
      const { pageNumber, pageSize } = response.pageable;

      // setting states with new books
      setBooks(newBooks);
      setPagination({
        ...pagination,
        current: pageNumber + 1,
        pageNumber: pageNumber,
        pageSize: pageSize,
        total: response.totalElements
      });
    }

    searchAllBooks();
  }, [bookId !== 0, bookName !== ""]);

  useEffect(() => {
    async function searchAllBooks() {
      const response = await _searchAllBooks(pagination); // searching books

      if (!response.successful) { // Not successful
        const config = {
          message: 'Book could not be loaded!',
          description: 'An error happened while trying to load books! Please try later!',
          duration: 4.5,
          key: 'search-all-book-error',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const newBooks = BookContentParser(response.content);

      // setting states with new books
      setBooks(newBooks);
      setPagination({
        ...pagination,
        total: response.totalElements
      });
      setIsSearch(0);
    }

    if (!isSearch) {
      return;
    }

    if (radioValue === "Search Book By ID" && bookId !== 0) {
      handleBookSearchById();
    } else if (radioValue === "Search Book By Name" && bookName) {
      handleBookSearchByName();
    } else {
      searchAllBooks();
    }
  }, [isSearch]);

  /* ========== Event Listener Functions ========== */
  function handleRadioValueChange(event) {
    setPagination(PAGINATION);
    setIsSearch(prev => prev + 1);
    setRadioValue(event.target.value);
  }

  function handlePaginationChange(current, pageSize) {
    setPagination({
      ...pagination,
      current: current,
      pageNumber: current - 1,
      pageSize: pageSize
    });
    setIsSearch((prev) => prev + 1);
  }

  async function handleBookSearchById() {
    if (bookId <= 0) {
      const config = {
        message: 'Check Book ID!',
        description: 'Book ID should be greater than 0!',
        duration: 4.5,
        key: 'search-user-by-id-error',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBookById({ bookId });
    if (!response.successful) { // Not Found
      const config = {
        message: 'Book is not found!',
        description: 'Book could not be found! Check book name and try again!',
        duration: 4.5,
        key: 'search-user-by-id-not-found-error',
        placement: 'top'
      }

      notification.error(config);

      setBookId(0);
      setPagination(PAGINATION);

      return;
    }

    const newBooks = BookContentParser(response.content);
    const { pageNumber, pageSize } = response.pageable;

    setBooks(newBooks);
    setPagination({
      ...pagination,
      current: pageNumber + 1,
      pageNumber: pageNumber,
      pageSize: pageSize,
      total: response.totalElements
    });
  }

  async function handleBookSearchByName() {
    if (bookName == null || bookName === "") {
      const config = {
        message: 'Check Book Name!',
        description: 'Book name should be provided!',
        duration: 4.5,
        key: 'search-book-by-name-error',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBooksByName({ bookName, pagination });
    if (!response.successful) { // Not Found
      const config = {
        message: 'Book is not found!',
        description: 'Book could not be found! Check book name and try again!',
        duration: 4.5,
        key: 'search-book-by-name-not-found-error',
        placement: 'top'
      }

      notification.error(config);

      setBookName("");
      setPagination(PAGINATION);

      return;
    }

    // Book(s) is found
    const newBooks = BookContentParser(response.content);
    const { pageNumber, pageSize } = response.pageable;

    setBooks(newBooks);
    setPagination({
      ...pagination,
      current: pageNumber + 1,
      pageNumber: pageNumber,
      pageSize: pageSize,
      total: response.totalElements
    });
  }

  async function handleUpdate(id, key, pageCount, publisher, publicationDate) {
    const response = await _updateBook({
      bookId: id,
      pageCount: pageCount,
      publisher: publisher,
      publicationDate: publicationDate
    })

    if (!response.successful) { // Unsuccessful request
      const config = {
        message: 'Update is not successful! ',
        description: 'Book could not be updated! Try again!',
        duration: 4.5,
        key: 'handle-update-error',
        placement: 'top'
      }

      notification.error(config);

      setBookId(0);
      setBookName("");
      setPagination(PAGINATION);

      return;
    }

    // Update is successful
    const config = {
      message: 'Book is updated!',
      description: 'Book is successfully updated!',
      duration: 4.5,
      key: 'user-update-success',
      placement: 'top'
    }

    notification.success(config);

    const newBook = BookListParser(response.data)[0];
    books[key] = {
      ...books[key],
      pageCount: newBook.pageCount,
      publisher: newBook.publisher,
      publicationDate: newBook.publicationDate
    }
    const newBooks = [...books];

    setBooks(newBooks);
  }

  /* ========== Return ========== */
  return (
    <>
      <BookSearch
        bookId={bookId}
        setBookId={setBookId}
        handleBookSearchById={handleBookSearchById}
        bookName={bookName}
        setBookName={setBookName}
        handleBookSearchByName={handleBookSearchByName}
        radioValue={radioValue}
        handleRadioValueChange={handleRadioValueChange}
      />

      <div className='book-show'>
        <h1>Books</h1>
        {books.map((book) => {
          return (<BookCollapseUpdate book={book} handleUpdate={handleUpdate} />)
        })}
      </div>

      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        showSizeChanger={true}
        total={pagination.total}
        pageSizeOptions={pagination.pageSizeOptions}
        onChange={handlePaginationChange}
      />
    </>
  );
}
