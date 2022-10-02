export function _checkAuth() {

  var axios = require('axios');

  var username = sessionStorage.getItem('Username') || localStorage.getItem('Username');
  var token = sessionStorage.getItem('Authorization') || localStorage.getItem('Authorization');

  var data = JSON.stringify({
    "username": username || "",
    "token": token || ""
  });

  var config = {
    method: 'post',
    url: process.env.REACT_APP_AUTH_URL,
    headers: {},
    data: data
  };

  return axios(config)
    .then(function (response) {
      return {
        successful: true,
        ...response.data
      }
    })
    .catch(function (error) {
      return {
        successful: false,
        ...error.data
      } 
    })
}

export function _login({ username, password }) {

  var axios = require('axios');
  var data = JSON.stringify({
    "username": username,
    "password": password
  });

  var config = {
    method: 'post',
    url: process.env.REACT_APP_LOGIN_URL,
    headers: {},
    data: data
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
