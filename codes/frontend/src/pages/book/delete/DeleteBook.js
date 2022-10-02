import React, { useEffect, useRef, useState } from "react";

import { notification, Pagination } from "antd";
import "antd/dist/antd.css";

import { BookContentParser } from "../util/BookContentParser";
import BookSearch from "../util/BookSearch";
import BookCollapseDelete from "./BookCollapseDelete";

import { _deleteBook, _searchAllBooks, _searchBookById, _searchBooksByName } from "../../../service/BookService";

import { PAGINATION } from "../../../globals/GlobalVariables";

export default function DeleteBook() {
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

  const notRenderPaginationEffect = useRef(true);

  /* ========== Use Effect Functions ========== */
  useEffect(() => {
    async function searchAllBook() {
      const response = await _searchAllBooks(PAGINATION); // searching books

      if (!response.successful) { // Not successful
        const config = {
          message: 'Books could not be loaded!',
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

      // setting states with new users
      setBooks(newBooks);
      setPagination({
        ...pagination,
        current: pageNumber + 1,
        pageNumber: pageNumber,
        pageSize: pageSize,
        total: response.totalElements
      });
    }

    searchAllBook();
  }, [bookId !== 0, bookName !== ""]);

  useEffect(() => {
    async function searchAllBook() {
      const response = await _searchAllBooks(pagination); // searching books

      if (!response.successful) { // Not successful
        const config = {
          message: 'Books could not be loaded!',
          description: 'An error happened while trying to load books! Please try later!',
          duration: 4.5,
          key: 'search-all-book-error',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const newBooks = BookContentParser(response.content);

      // setting states with new users
      setBooks(newBooks);
      setPagination({
        ...pagination,
        total: response.totalElements
      });
      setIsSearch(0);
    }

    if (notRenderPaginationEffect.current) {
      notRenderPaginationEffect.current = false;
      return;
    }

    if (!isSearch) {
      return;
    }

    if (radioValue === "Search Book By ID" && bookId !== 0) {
      handleBookSearchById();
    } else if (radioValue === "Search Book By Name" && bookName) {
      handleBookSearchByName();
    } else {
      searchAllBook();
    }
  }, [isSearch]);

  /* ========== Event Listener Functions ========== */
  function handleRadioValueChange(event) {
    setPagination(PAGINATION);
    setIsSearch(prev => prev + 1);
    setRadioValue(event.target.value);
  };

  function handlePaginationChange(current, pageSize) {
    setPagination({
      ...pagination,
      current: current,
      pageNumber: current - 1,
      pageSize: pageSize
    });
    setIsSearch(prev => prev + 1);
  }

  async function handleBookSearchById() {
    if (bookId <= 0) {
      const config = {
        message: 'Check User ID!',
        description: 'User ID should be greater than 0!',
        duration: 4.5,
        key: 'search-book-by-id-error',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBookById({ bookId });
    if (!response.successful) { // Not Found
      const config = {
        message: 'Book is not found!',
        description: 'Book could not be found! Check book id and try again!',
        duration: 4.5,
        key: 'search-book-by-id-not-found-error',
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
        key: 'search-book-by-username-error',
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

  async function handleDelete(id) {
    const response = await _deleteBook({ bookId: id });

    if (!response.successful) { // Unsuccessful request
      const config = {
        message: 'Delete is not successful! ',
        description: 'Book could not be deleted! Try again!',
        duration: 4.5,
        key: 'handle-delete-error',
        placement: 'top'
      }

      notification.error(config);

      setBookId(0);
      setBookName("");
      setPagination(PAGINATION);

      return;
    }

    // Delete is successful
    const config = {
      message: 'Book is deleted!',
      description: 'Book is successfully deleted!',
      duration: 4.5,
      key: 'book-delete-success',
      placement: 'top'
    }

    notification.success(config);

    setBookId(0);
    setBookName("");
    setIsSearch(prev => prev + 1);
    setPagination(PAGINATION);
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
          return (<BookCollapseDelete book={book} handleDelete={handleDelete} />)
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
