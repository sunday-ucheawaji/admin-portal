import React, { useState, useEffect } from "react";
import apiClient from "../../../http/http-common";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Badge from "../../../components/badge/Badge";

function useTradeUsers() {
  const tradesTableHead = [
    "",
    "Username",
    "Type",
    "Initial Amount",
    "Minimum Amount",
    "Rate",
    "Available",
    "Status",
    "From Currency",
    "To Currency",
  ];

  const tradesStatus = {
    shipping: "primary",
    pending: "warning",
    ACTIVE: "success",
    CANCELLED: "danger",
  };

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr
      style={{ cursor: "pointer" }}
      onClick={() => console.log(item)}
      key={index}
    >
      <td>{index + 1}</td>
      <td>{item.username}</td>
      <td>{item.type}</td>
      <td>{item?.initialAmount}</td>
      <td>{item?.minimumAmount}</td>
      <td>{item?.rate}</td>
      <td>{item?.available}</td>
      <td>
        <Badge type={tradesStatus[item.status]} content={item.status} />
      </td>
      <td>{item?.fromCurrency}</td>
      <td>{item?.toCurrency}</td>
    </tr>
  );

  const limit = "10";

  const { id } = useParams();

  const [dataShow, setDataShow] = useState([]);

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    "trades",
    async () => await apiClient.get(`/trade/user/${id}`) // 37de2730-c6f0-11ed-90df-db56c3def619
  );

  useEffect(() => {
    refetch();
  }, []);

  const tradesList = data?.data?.data?.trades;

  useEffect(() => {
    const initDataShow =
      limit && tradesList ? tradesList.slice(0, Number(limit)) : tradesList;

    const listOfTrades = initDataShow?.map((transaction) => {
      return {
        ...transaction,
        fromCurrency: transaction?.fromCurrency?.currency,
        toCurrency: transaction?.toCurrency?.currency,
      };
    });

    setDataShow(listOfTrades || []);
  }, [limit, tradesList]);

  if (error?.response?.data?.message === "User session expired") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  const history = useHistory();
  return {
    tradesList,
    error,
    isLoading,
    isFetching,

    tradesTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  };
}

export default useTradeUsers;
