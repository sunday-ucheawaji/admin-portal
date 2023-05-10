import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import apiClient from "../../http/http-common";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

function useRole() {
  const roleTableHead = ["", "Name", "Created At", "Updated At"];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => console.log(item)}
      key={index}
    >
      <td>{index + 1}</td>
      <td>{item.name}</td>
      <td>
        <Moment format="DD-MM-YYYY hh:mm a">{item.createdAt}</Moment>
      </td>
      {/* <td>{item?.roleId}</td> */}
      <td>
        <Moment format="DD-MM-YYYY hh:mm a">{item.updatedAt}</Moment>
      </td>
    </tr>
  );

  const limit = "10";

  const [dataShow, setDataShow] = useState([]);

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    "admin",
    async () => await apiClient.get("/roles")
  );

  const rolesList = data?.data?.data;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const initDataShow =
      limit && Array.isArray(rolesList)
        ? rolesList?.slice(0, Number(limit))
        : rolesList;

    setDataShow(initDataShow || []);
  }, [limit, rolesList]);

  if (error?.response?.data?.message === "User session expired") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  const history = useHistory();
  return {
    rolesList,
    error,
    isLoading,
    isFetching,

    roleTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  };
}

export default useRole;
