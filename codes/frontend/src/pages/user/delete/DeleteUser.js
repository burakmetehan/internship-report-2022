import React, { useEffect, useRef, useState } from "react";

import { notification, Pagination } from "antd";
import "antd/dist/antd.css";

import { UserContentParser, UserListParser } from "../util/UserContentParser";
import UserSearch from "../util/UserSearch";
import UserCollapseDelete from "./UserCollapseDelete";

import {
  _deleteUser, _searchAllUsers, _searchUserById, _searchUserByUsername
} from "../../../service/UserService";


import { PAGINATION } from "../../../globals/GlobalVariables";

export default function DeleteUser() {
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([{
    id: 0,
    key: 0,
    username: "",
    readList: null,
    favoriteList: null,
    roles: null
  }]);
  const [radioValue, setRadioValue] = useState("Search User By ID");
  const [pagination, setPagination] = useState(PAGINATION);
  // isSearch makes use of the fact that '0: false, others: true'
  const [isSearch, setIsSearch] = useState(0);

  const notRenderPaginationEffect = useRef(true);

  /* ========== Use Effect Functions ========== */
  useEffect(() => {
    async function searchAllUsers() {
      const response = await _searchAllUsers(PAGINATION); // searching users

      if (!response.successful) { // Not successful
        const config = {
          description: 'User could not be loaded!',
          duration: 4.5,
          key: 'search-all-user-error',
          message: 'An error happened while trying to load users! Please try later!',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const newUsers = UserContentParser(response.content);
      const { pageNumber, pageSize } = response.pageable;

      // setting states with new users
      setUsers(newUsers);
      setPagination({
        ...pagination,
        current: pageNumber + 1,
        pageNumber: pageNumber,
        pageSize: pageSize,
        total: response.totalElements
      });
    }

    searchAllUsers();
  }, [userId !== 0, username !== ""]);

  useEffect(() => {
    async function searchAllUsers() {
      const response = await _searchAllUsers(pagination); // searching users

      if (!response.successful) { // Not successful
        const config = {
          description: 'User could not be loaded!',
          duration: 4.5,
          key: 'search-all-user-error',
          message: 'An error happened while trying to load users! Please try later!',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const newUsers = UserContentParser(response.content);

      // setting states with new users
      setUsers(newUsers);
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

    if (radioValue === "Search User By ID" && userId !== 0) {
      handleUserSearchById();
    } else if (radioValue === "Search User By Username" && username) {
      handleUserSearchByUsername();
    } else {
      searchAllUsers();
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
    setIsSearch((prev) => prev + 1);
  }

  async function handleUserSearchById() {
    if (userId <= 0) {
      const config = {
        description: 'Check User ID!',
        duration: 4.5,
        key: 'search-user-by-id-error',
        message: 'User ID should be greater than 0!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchUserById({ userId });
    if (!response.successful) { // Not Found
      const config = {
        description: 'User is not found!',
        duration: 4.5,
        key: 'search-user-by-id-not-found-error',
        message: 'User could not be found! Check user id and try again!',
        placement: 'top'
      }

      notification.error(config);

      setUserId(0);
      setPagination(PAGINATION);

      return;
    }

    const newUsers = UserContentParser(response.content);
    const { pageNumber, pageSize } = response.pageable;

    setUsers(newUsers);
    setPagination({
      ...pagination,
      current: pageNumber + 1,
      pageNumber: pageNumber,
      pageSize: pageSize,
      total: response.totalElements
    });
  }

  async function handleUserSearchByUsername() {
    if (username == null || username === "") {
      const config = {
        description: 'Check Username!',
        duration: 4.5,
        key: 'search-user-by-username-error',
        message: 'Username should be provided!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const response = await _searchUserByUsername({ username, pagination });
    if (!response.successful) { // Not Found
      const config = {
        description: 'User is not found!',
        duration: 4.5,
        key: 'search-user-by-username-not-found-error',
        message: 'User could not be found! Check username and try again!',
        placement: 'top'
      }

      notification.error(config);

      setUsername("");
      setPagination(PAGINATION);

      return;
    }

    // User(s) is found
    const newUsers = UserContentParser(response.content);
    const { pageNumber, pageSize } = response.pageable;

    setUsers(newUsers);
    setPagination({
      ...pagination,
      current: pageNumber + 1,
      pageNumber: pageNumber,
      pageSize: pageSize,
      total: response.totalElements
    });
  }

  async function handleDelete(id) {
    const response = await _deleteUser({ userId: id });

    if (!response.successful) { // Unsuccessful request
      const config = {
        description: 'User could not be deleted! Try again!',
        duration: 4.5,
        key: 'handle-delete-error',
        message: 'Delete is not successful! ',
        placement: 'top'
      }

      notification.error(config);

      setUserId(0);
      setUsername("");
      setPagination(PAGINATION);

      return;
    }

    // Delete is successful
    const config = {
      description: 'User is successfully deleted!',
      duration: 4.5,
      key: 'user-delete-success',
      message: 'User is deleted!',
      placement: 'top'
    }

    notification.success(config);

    const newUsers = UserListParser(response.data);

    setUserId(0);
    setUsername("");
    setUsers(newUsers);
  }

  /* ========== Return ========== */
  return (
    <>
      <UserSearch
        userId={userId}
        setUserId={setUserId}
        handleUserSearchById={handleUserSearchById}
        username={username}
        setUsername={setUsername}
        handleUserSearchByUsername={handleUserSearchByUsername}
        radioValue={radioValue}
        handleRadioValueChange={handleRadioValueChange}
      />

      <div className='user-show'>
        <h1>Users</h1>
        {users.map((user) => {
          return (<UserCollapseDelete user={user} handleDelete={handleDelete} />)
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
