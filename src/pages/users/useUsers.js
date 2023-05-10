import React, { useState, useEffect } from "react";
import apiClient from "../../http/http-common";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import Badge from "../../components/badge/Badge";

function useUsers() {
  const usersTableHead = [
    "",
    "First Name",
    "Last Name",
    "Email",
    "Username",
    "Phone Number",
    "Status",
    // "Last Login",
  ];

  const usersStatus = {
    shipping: "primary",
    UNVERIFIED: "warning",
    ACTIVE: "success",
    refund: "danger",
  };

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => console.log(item)}
      key={index}
    >
      <td>{index + 1}</td>
      <td>{item.firstname}</td>
      <td>{item.lastname}</td>
      <td>{item.email}</td>
      <td>{item.username}</td>
      <td>{item.phoneNumber}</td>
      <td>
        <Badge type={usersStatus[item.status]} content={item.status} />
      </td>
    </tr>
  );

  const limit = "10";

  const [dataShow, setDataShow] = useState([]);

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    "users",
    async () => await apiClient.get("/users")
  );

  useEffect(() => {
    refetch();
  }, []);

  const usersList = data?.data?.data?.users;

  useEffect(() => {
    const initDataShow =
      limit && usersList ? usersList.slice(0, Number(limit)) : usersList;

    setDataShow(initDataShow || []);
  }, [limit, usersList]);

  if (error?.response?.data?.message === "User session expired") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  const history = useHistory();
  return {
    usersList,
    error,
    isLoading,
    isFetching,

    usersTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  };
}

export default useUsers;
