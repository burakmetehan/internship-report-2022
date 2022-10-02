import React, { useEffect, useRef, useState } from "react";

import { Button, notification, Space, Table } from 'antd';
import "antd/dist/antd.css";

import { BOOK_COLUMNS, PAGINATION } from "../../../globals/GlobalVariables";
import { BookContentParserWithUserListInfo } from "../util/BookContentParser";
import BookSearch from "../util/BookSearch";

import {
  _addFavoriteList,
  _addReadList,
  _removeFavoriteList,
  _removeReadList
} from "../../../service/BookListService";
import { _searchAllBooks, _searchBookById, _searchBooksByName } from "../../../service/BookService";
import { _searchUserByUsernameList } from "../../../service/UserService";

const options = [
  {
    label: 'Search Book By ID',
    value: 'Search Book By ID'
  },
  {
    label: 'Search Book By Name',
    value: 'Search Book By Name'
  }
];


export default function BookList() {
  const bookColumns = [
    ...BOOK_COLUMNS,
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle' direction="vertical">
          <Button
            type="primary"
            onClick={() => handleFavoriteList(record.id, record.key)}
            danger={record.isFavorite}
          >
            {record.isFavorite ? 'Remove Favorite List' : 'Add Favorite List'}
          </Button>

          <Button
            type="primary"
            onClick={() => handleReadList(record.id, record.key)}
            danger={record.isRead}
          >
            {record.isRead ? 'Remove Read List' : 'Add Read List'}
          </Button>
        </Space>
      )
    }
  ];

  /* ========== States ========== */
  const [bookId, setBookId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [bookName, setBookName] = useState('');
  const [radioValue, setRadioValue] = useState('Search Book By ID')
  const [readBooks, setReadBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isSearchAll, setIsSearchAll] = useState(true);

  const [books, setBooks] = useState([{
    key: 0,
    name: "",
    author: "",
    pageCount: -1,
    type: "",
    publisher: "",
    publicationDate: "1970-01-01",
    isFavorite: false,
    isRead: false
  }]);

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(PAGINATION);

  const [isSearch, setIsSearch] = useState(0);

  /* ========== Refs ========== */
  const isFirstRenderUserId = useRef(true); // Variable to block run in first render
  const isFirstRender = useRef(true); // Block first run of useEffect 

  /* ========== Use Effect Functions ========== */
  // In the beginning, getting user data from database
  useEffect(() => {
    async function searchUser() {
      setLoading(true);

      const username = sessionStorage.getItem('Username'); // Getting username from sessionStorage
      const response = await _searchUserByUsernameList({ username }); // Database call for search by username

      if (!response.successful) { // Not successful
        const config = {
          message: 'User is not found!',
          description: 'An error occurred while searching user! Try Logging out and Logging in again!',
          duration: 4.5,
          key: 'book-list-search-user-error',
          placement: 'top'
        }

        notification.error(config);
        return;
      }

      const user = response.data && response.data[0];

      setUserId(user.id);
      setReadBooks(user.readList.map(book => book.id));
      setFavoriteBooks(user.favoriteList.map(book => book.id));

      setLoading(false);
    }

    searchUser();
  }, []);

  // In the beginning, load the all books. Since userId does not change except the beginning. It will run once.
  useEffect(() => {
    async function searchAllBook() {
      setLoading(true);

      const response = await _searchAllBooks(PAGINATION); // searching books by pagination

      if (!response.successful) { // Not successful
        const config = {
          message: 'Books are not found!',
          description: 'An error occurred while searching books! Try again!',
          duration: 4.5,
          key: 'book-list-search-all-book-error',
          placement: 'top'
        }

        notification.error(config);
        return;
      }

      // setting total elements in the beginning
      setPagination({
        ...pagination,
        total: response.totalElements
      })

      const newContent = BookContentParserWithUserListInfo(response.content, favoriteBooks, readBooks);

      setBooks(newContent);

      setLoading(false);
    }

    // Block the run of the useEffect in the initial render
    if (isFirstRenderUserId.current) {
      isFirstRenderUserId.current = false;
      return;
    }

    searchAllBook();
  }, [userId]);

  // useEffect when bookId or bookName is reset
  useEffect(() => {
    async function searchAllBook() {
      setLoading(true);

      const response = await _searchAllBooks(PAGINATION);

      if (!response.successful) { // Not successful
        const config = {
          message: 'Books are not found!',
          description: 'An error occurred while searching books! Try again!',
          duration: 4.5,
          key: 'book-list-search-all-book-error',
          placement: 'top'
        }

        notification.error(config);
        return;
      }

      const newBooks = BookContentParserWithUserListInfo(response.content, favoriteBooks, readBooks);
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

      setLoading(false);
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    searchAllBook();
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

      const newBooks = BookContentParserWithUserListInfo(response.content, favoriteBooks, readBooks);

      // setting states with new books
      setBooks(newBooks);
      setPagination({
        ...pagination,
        total: response.totalElements
      });
      setIsSearch(0); // Restart the isSearch for possible overflow
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


  /* ========== Handle Functions ========== */
  function handleRadioValueChange(event) {
    setRadioValue(event.target.value);
    setPagination(PAGINATION);
    setIsSearch(prev => prev + 1);
  }

  function handleTableChange(newPagination) {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      pageNumber: newPagination.current - 1
    });
    setIsSearch(prev => prev + 1);
  }

  async function handleFavoriteList(id, key) {
    let response;
    const isAdd = !(books[key].isFavorite);

    if (isAdd) {
      response = await _addFavoriteList({ userId, bookId: id });
    } else {
      response = await _removeFavoriteList({ userId, bookId: id });
    }

    if (!response.successful) { // Not successful
      const config = {
        description: 'An error is occured while handling favorite lists!',
        duration: 4.5,
        key: 'book-list-handle-fav-error',
        message: 'Error in handleFav',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    if (isAdd) {
      books[key].isFavorite = true;
      setFavoriteBooks([
        ...favoriteBooks,
        books[key].id
      ]);
    } else {
      books[key].isFavorite = false;
      const newFavoriteBooks = favoriteBooks.filter(bookId => bookId !== books[key].id);
      setFavoriteBooks(newFavoriteBooks);
    }

    const newContent = [...books];
    setBooks(newContent);
  }

  async function handleReadList(id, key) {
    let response;
    const isAdd = !(books[key].isRead);

    if (isAdd) {
      response = await _addReadList({ userId, bookId: id });
    } else {
      response = await _removeReadList({ userId, bookId: id });

    }

    if (!response.successful) { // Not successful
      const config = {
        description: 'An error is occured while handling read lists!',
        duration: 4.5,
        key: 'book-list-handle-read-error',
        message: 'Error in handleRead',
        placement: 'top'
      }

      notification.error(config);
      return;
    }

    if (isAdd) {
      books[key].isRead = true;
      setReadBooks([
        ...readBooks,
        books[key].id
      ]);
    } else {
      books[key].isRead = false;
      const newReadBooks = readBooks.filter(bookId => bookId !== books[key].id);
      setFavoriteBooks(newReadBooks);
    }

    const newContent = [...books];
    setBooks(newContent);
  }

  async function handleBookSearchById() {
    if (bookId <= 0) {
      const config = {
        message: 'Check Book ID!',
        description: 'Check Book ID! Book ID should be greater than 0!',
        duration: 4.5,
        key: 'handle-book-search-by-id-warning',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBookById({ bookId });

    if (!response.successful) {
      const config = {
        message: 'Book is not found!',
        description: 'Book could not be found! Check book id and try again!',
        duration: 4.5,
        key: 'handle-book-search-by-id-error',
        placement: 'top'
      }

      notification.error(config);

      setBooks([]);
      return;
    }

    const newContent = BookContentParserWithUserListInfo(response.content, favoriteBooks, readBooks);

    setBooks(newContent);
    setPagination({
      ...pagination,
      current: response.pageable.pageNumber + 1,
      pageSize: response.pageable.pageSize,
      pageNumber: response.pageable.pageNumber,
      total: response.totalElements
    })
  }

  async function handleBookSearchByName() {
    if (bookName == null || bookName === "") {
      const config = {
        message: 'Check Book Name!',
        description: 'Check Book Name! Book name should be provided!',
        duration: 4.5,
        key: 'handle-book-search-by-name-error',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchBooksByName({ bookName, pagination });

    if (!response.successful) {
      const config = {
        message: 'Book is not found!',
        description: 'Book could not be found! Check book name and try again!',
        duration: 4.5,
        key: 'handle-book-search-by-name-error',
        placement: 'top'
      }

      notification.error(config);

      setBooks([]);
      return;
    }

    const newBooks = BookContentParserWithUserListInfo(response.content, favoriteBooks, readBooks);

    setBooks(newBooks);
    setPagination({
      ...pagination,
      current: response.pageable.pageNumber + 1,
      pageSize: response.pageable.pageSize,
      pageNumber: response.pageable.pageNumber,
      total: response.totalElements
    })
  }

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

      <Table
        loading={loading}
        columns={bookColumns}
        dataSource={books}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}
