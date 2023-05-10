import React, { useState, useEffect } from "react";
import apiClient from "../../http/http-common";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import Badge from "../../components/badge/Badge";

function useTransactions() {
  const transactionsTableHead = [
    "",
    "Amount",
    "Currency",
    "Payment Gateway",
    "Payment Gateway Ref",
    "Payment Method",
    "Purpose",
    "Status",
  ];

  const transactionStatus = {
    shipping: "primary",
    pending: "warning",
    SUCCESSFUL: "success",
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
      <td>{item.amount}</td>
      <td>{item.currency}</td>
      <td>{item.paymentGateway}</td>
      <td>{item.paymentGatewayReference}</td>
      <td>{item.paymentMethod}</td>
      <td>{item.purpose}</td>

      <td>
        <Badge type={transactionStatus[item.status]} content={item.status} />
      </td>
    </tr>
  );

  const limit = "10";

  const [dataShow, setDataShow] = useState([]);

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    "transactions",
    async () => await apiClient.get("/transactions")
  );

  const transactionList = data?.data?.data?.transactions;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const initDataShow =
      limit && Array.isArray(transactionList)
        ? transactionList?.slice(0, Number(limit))
        : transactionList;

    setDataShow(initDataShow || []);
  }, [limit, transactionList]);

  if (error?.response?.data?.message === "User session expired") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  console.log(transactionList);

  const history = useHistory();
  return {
    transactionList,
    error,
    isLoading,
    isFetching,

    transactionsTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  };
}

export default useTransactions;
