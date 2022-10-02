import { BookOutlined, HomeOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Popconfirm } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Login from "./pages/auth/Login";
import Book from "./pages/book/Book";
import Home from "./pages/Home";
import User from "./pages/user/User";

import { _checkAuth } from "./service/AuthService";

const { Header, Content } = Layout;

// Interceptor for axios
axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = sessionStorage.getItem('Authorization') || localStorage.getItem('Authorization');
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default function App() {
  const [headerKey, setHeaderKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const response = await _checkAuth();
      const { isAdmin, isValid, token, username } = response;

      if (response.successful && isValid && token && username) {
        localStorage.setItem('Username', username)
        localStorage.setItem('Authorization', token);

        sessionStorage.setItem('Username', username)
        sessionStorage.setItem('Authorization', token);

        setIsAuthenticated(true);
      } else {
        localStorage.clear();
        sessionStorage.clear();

        setIsAuthenticated(false);
      }

      setAdmin(isAdmin || false);
    }

    checkAuth();
  }, [])

  function onLogout() {
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);
  }

  return (
    <>
      {
        isAuthenticated ?
          <Router>
            <Layout
              style={{ height: '100vh' }}
            >
              <Header className="header">
                <div className="logo" />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  selectedKeys={[headerKey]}
                >
                  <Menu.Item key="home">
                    <Link to="/"><HomeOutlined /> Home</Link>
                  </Menu.Item>
                  {
                    admin ?
                      <Menu.Item key="user">
                        <Link to="/user"><UserOutlined /> User</Link>
                      </Menu.Item>
                      :
                      null
                  }

                  <Menu.Item key="book">
                    <Link to="/book"><BookOutlined /> Book</Link>
                  </Menu.Item>
                  <Menu.Item key="logout">
                    <Popconfirm
                      title="Are you sure to delete this task?"
                      onConfirm={onLogout}
                      onCancel={() => { }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Link to="/logout"><LogoutOutlined /> Logout</Link>
                    </Popconfirm>
                  </Menu.Item>
                </Menu>
              </Header>

              <Content
                className="site-layout"
              >
                <Switch>
                  <Route exact path="/">
                    <Home setIsAuthenticated={setIsAuthenticated} setHeaderKey={setHeaderKey} />
                  </Route>
                  {
                    admin ?
                      <Route path="/user">
                        <User setHeaderKey={setHeaderKey} />
                      </Route>
                      : null
                  }
                  <Route path="/book">
                    <Book setHeaderKey={setHeaderKey} admin={admin} />
                  </Route>
                  <Route path="/logout">
                    <></>
                  </Route>
                </Switch>
              </Content>
            </Layout>
          </Router >
          : <Login setIsAuthenticated={setIsAuthenticated} setAdmin={setAdmin} />
      }
    </>)
}
