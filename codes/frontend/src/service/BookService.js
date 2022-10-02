export function _addBook({
  name,
  author,
  pageCount,
  type,
  publisher,
  publicationDate
}) {

  var axios = require('axios');
  var data = JSON.stringify({
    "name": name,
    "author": author,
    "pageCount": pageCount,
    "type": type,
    "publisher": publisher,
    "publicationDate": publicationDate
  });

  var config = {
    method: 'post',
    url: process.env.REACT_APP_BOOKS_URL,
    headers: {},
    data: data
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: [response.data]
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _deleteBook({ bookId }) {

  var axios = require('axios');
  var config = {
    method: 'delete',
    url: `${process.env.REACT_APP_BOOKS_URL}/${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: [response.data]
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchAllBooks(pagination) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: process.env.REACT_APP_BOOKS_URL,
    headers: {},
    params:{
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize
    }
  };

  return axios(config)
  .then(function (response) {
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchAllBooksList() {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: process.env.REACT_APP_BOOKS_URL_NO_PAGE,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchBookById({ bookId }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_BOOKS_URL}/${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchBookByIdList({ bookId }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_BOOKS_URL_NO_PAGE}/${bookId}`,
    headers: {}
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: [response.data]
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchBooksByName({ bookName, pagination }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_BOOKS_URL}/name`,
    headers: {},
    params: {
      bookName: bookName,
      pageNumber: pagination.pageNumber,
      pageSize: pagination.pageSize
    }
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _searchBooksByNameList({ bookName }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_BOOKS_URL_NO_PAGE}/name`,
    headers: {},
    params: {
      bookName: bookName
    }
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: response.data
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}

export function _updateBook({ bookId, pageCount, publisher, publicationDate }) {

  var axios = require('axios');
  var data = JSON.stringify({
    "pageCount": pageCount || "",
    "publisher": publisher || "",
    "publicationDate": publicationDate || ""
  });

  var config = {
    method: 'put',
    url: `${process.env.REACT_APP_BOOKS_URL}/${bookId}`,
    headers: {},
    data: data
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        data: [response.data]
      };
    })
    .catch(function () {
      return {
        successful: false
      };
    });
}
