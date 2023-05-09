import React from "react";
import apiClient from "../../http/http-common";
import { useQuery } from "react-query";
import { useHistory } from "react-router";

function useAdmin() {
  const { data, error, isLoading, isFetching, refetch } = useQuery(
    "admin",
    async () => await apiClient.get("/admins")
  );

  const adminList = data?.data?.data?.users;
  // const listOfAdmins = data?.data?.data?.users?.map((admin) => {
  //   return {
  //     key: admin?.id,
  //     ...admin,
  //     roleId: admin?.roleId?._id,
  //     roleName: admin?.roleId?.name,
  //   };
  // });

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
    refetch,
  };
}

export default useAdmin;
