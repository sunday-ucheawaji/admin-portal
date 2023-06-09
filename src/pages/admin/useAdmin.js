import React, { useState, useEffect } from "react";
import apiClient from "../../http/http-common";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import Badge from "../../components/badge/Badge";

function useAdmin() {
  const adminTableHead = [
    "",
    "Email",
    "Full Name",
    // "Role ID",
    "Role",
    "Status",
    // "Last Login",
  ];

  const adminStatus = {
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
      <td>{item.fullName}</td>
      {/* <td>{item?.roleId}</td> */}
      <td>{item?.roleName}</td>

      <td>
        <Badge type={adminStatus[item.status]} content={item.status} />
      </td>
      {/* <td>{item.lastLoginAt}</td> */}
    </tr>
  );

  const limit = "10";

  const [dataShow, setDataShow] = useState([]);

  const { data, error, isLoading, isFetching, refetch } = useQuery(
    "admin",
    async () => await apiClient.get("/admins")
  );

  useEffect(() => {
    refetch();
  }, []);

  const adminList = data?.data?.data?.users;

  useEffect(() => {
    const initDataShow =
      limit && adminList ? adminList.slice(0, Number(limit)) : adminList;

    const listOfAdmins = initDataShow?.map((admin) => {
      return {
        id: admin?.id,
        ...admin,
        roleId: admin?.roleId?._id,
        roleName: admin?.roleId?.name,
      };
    });

    setDataShow(listOfAdmins || []);
  }, [limit, adminList]);

  if (error?.response?.data?.message === "User session expired") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }

  const history = useHistory();
  return {
    adminList,
    error,
    isLoading,
    isFetching,

    adminTableHead,
    dataShow,
    limit,
    setDataShow,

    renderBody,
    renderHead,
    refetch,
  };
}

export default useAdmin;
