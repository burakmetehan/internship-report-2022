export function _addUser({ username, password }) {
  var axios = require('axios');

  var data = JSON.stringify({
    username: username,
    password: password
  });

  var config = {
    method: 'post',
    url: process.env.REACT_APP_USERS_URL,
    headers: {},
    data: data
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

export function _deleteUser({ userId }) {

  var axios = require('axios');

  var config = {
    method: 'delete',
    url: `${process.env.REACT_APP_USERS_URL}/${userId}`,
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

export function _searchAllUsers(pagination) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: process.env.REACT_APP_USERS_URL,
    headers: {},
    params: {
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

export function _searchAllUsersList() {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: process.env.REACT_APP_USERS_URL_NO_PAGE,
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

export function _searchUserById({ userId }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_USERS_URL}/${userId}`,
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

export function _searchUserByIdList({ userId }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_USERS_URL_NO_PAGE}/${userId}`,
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

export function _searchUserByUsername({ username, pagination }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_USERS_URL}/username`,
    headers: {},
    params: {
      username: username,
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

export function _searchUserByUsernameList({ username }) {

  var axios = require('axios');

  var config = {
    method: 'get',
    url: `${process.env.REACT_APP_USERS_URL_NO_PAGE}/username`,
    headers: {},
    params: {
      username: username
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

export function _updateUser({ userId, newPassword }) {

  var axios = require('axios');
  var data = JSON.stringify({
    'password': newPassword
  });

  var config = {
    method: 'put',
    url: `${process.env.REACT_APP_USERS_URL}/${userId}`,
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
