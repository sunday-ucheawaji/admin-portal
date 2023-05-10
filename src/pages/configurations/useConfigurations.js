import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import apiClient from "../../http/http-common";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

function useConfigurations() {
  const configurationsTableHead = [
    "",
    "Config Key",
    "Config Value",
    "Created At",
    "Updated At",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => console.log(item)}
      key={index}
    >
      <td>{index + 1}</td>
      <td>{item.configKey}</td>
      <td>{item.configValue}</td>
      <td>
        <Moment format="DD-MM-YYYY hh:mm a">{item.createdAt}</Moment>
      </td>
      <td>
        <Moment format="DD-MM-YYYY hh:mm a">{item.updatedAt}</Moment>
      </td>
    </tr>
  );

  const limit = "10";

  const [dataShow, setDataShow] = useState([]);

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    "configurations",
    async () => await apiClient.get("/configurations")
  );

  const configurationsList = data?.data?.data;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const initDataShow =
      limit && Array.isArray(configurationsList)
        ? configurationsList?.slice(0, Number(limit))
        : configurationsList;

    setDataShow(initDataShow || []);
  }, [limit, configurationsList]);

  if (error?.response?.data?.message === "User session expired") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  const history = useHistory();
  return {
    configurationsList,
    error,
    isLoading,
    isFetching,

    configurationsTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  };
}

export default useConfigurations;
