export function _addFavoriteList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: process.env.REACT_APP_FAV_URL,
    headers: {},
    params: {
      userId: userId,
      bookId: bookId,
      isAdd: true
    }
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function () {
      return {
        successful: false
      }
    });
}

export function _addReadList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: process.env.REACT_APP_READ_URL,
    headers: {},
    params: {
      userId: userId,
      bookId: bookId,
      isAdd: true
    }
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function () {
      return {
        successful: false
      }
    });

}

export function _removeFavoriteList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: process.env.REACT_APP_FAV_URL,
    headers: {},
    params: {
      userId: userId,
      bookId: bookId,
      isAdd: false
    }
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function () {
      return {
        successful: false
      }
    });
}

export function _removeReadList({ userId, bookId }) {

  var axios = require('axios');

  var config = {
    method: 'put',
    url: process.env.REACT_APP_READ_URL,
    headers: {},
    params: {
      userId: userId,
      bookId: bookId,
      isAdd: false
    }
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function () {
      return {
        successful: false
      }
    });

}
