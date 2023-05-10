import React, { useState, useEffect } from "react";
import apiClient from "../../http/http-common";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import Badge from "../../components/badge/Badge";

function useSubscribers() {
  const subscribersTableHead = ["", "Email", "Name"];

  const subscribersStatus = {
    shipping: "primary",
    pending: "warning",
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
      <td>{item.email}</td>
      <td>{item.name}</td>
    </tr>
  );

  const limit = "10";

  const [dataShow, setDataShow] = useState([]);

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    "subscribers",
    async () => await apiClient.get("/subscribers")
  );

  useEffect(() => {
    refetch();
  }, []);

  const subscribersList = data?.data?.data?.subscribers;

  useEffect(() => {
    const initDataShow =
      limit && subscribersList
        ? subscribersList.slice(0, Number(limit))
        : subscribersList;

    setDataShow(initDataShow || []);
  }, [limit, subscribersList]);

  if (error?.response?.data?.message === "User session expired") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  const history = useHistory();
  return {
    subscribersList,
    error,
    isLoading,
    isFetching,

    subscribersTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  };
}

export default useSubscribers;
